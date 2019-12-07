package es.practica11.worker;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.practica11.interfaces.grpc.UpperRequest;
import es.practica11.interfaces.grpc.UpperResponse;
import es.practica11.interfaces.grpc.UpperServiceGrpc.UpperServiceBlockingStub;
import net.devh.boot.grpc.client.inject.GrpcClient;

@Component
public class WorkerUpper {

	@GrpcClient("upperServer")
	private UpperServiceBlockingStub client;
	@Autowired
	RabbitTemplate rabbitTemplate;

	@RabbitListener(queues = "createtask", ackMode = "AUTO")
	public void received(String message) throws InterruptedException {
		System.out.println("Message: " + message);
		process(message);
	}

	private void process(String message) throws InterruptedException {
		String response = callGrpc(message);
		processing();
		System.out.println("Response received from server:\n" + response);
		rabbitTemplate.convertAndSend("updatetask", "Complete: " + response);
	}

	private String callGrpc(String message) {
		UpperRequest request = UpperRequest.newBuilder()
	            .setRequestString(message)
	            .build();
		UpperResponse response = client.toUpper(request);
		return response.getResponseString();
	}

	private void processing() throws InterruptedException {
		for(int i = 1; i <= 100; i++) {
			rabbitTemplate.convertAndSend("updatetask", "Progress: " + (i + "%"));
			Thread.sleep(1000);
		}
	}
}