package es.practica11.worker;

import org.json.JSONObject;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.practica11.interfaces.grpc.Request;
import es.practica11.interfaces.grpc.Response;
import es.practica11.interfaces.grpc.UpperServiceGrpc.UpperServiceBlockingStub;
import net.devh.boot.grpc.client.inject.GrpcClient;

@Component
public class WorkerUpper {

	@GrpcClient("upperServer")
	private UpperServiceBlockingStub client;
	@Autowired
	RabbitTemplate rabbitTemplate;

	@RabbitListener(queues = "newTasks", ackMode = "AUTO")
	public void received(String message) throws InterruptedException {
		System.out.println("Message: " + message);
		process(new JSONObject(message));
	}

	private void process(JSONObject messagObject) throws InterruptedException {
		String response = callGrpc(messagObject.getString("text"));
		System.out.println("Response received from server grpc:\n" + response);
		processing(messagObject.getString("id"));
		finish(messagObject.getString("id"), response);
	}

	private String callGrpc(String message) {
		Request request = Request.newBuilder()
	            .setText(message)
	            .build();
		Response response = client.toUpperCase(request);
		return response.getResult();
	}

	private void processing(String idTask) throws InterruptedException {
		for(int i = 1; i < 100; i++) {
			JSONObject messagObject = new JSONObject()
				.put("id", idTask)
				.put("completed", false)
				.put("progress", i);
			rabbitTemplate.convertAndSend("tasksProgress", messagObject.toString());
			Thread.sleep(500);
		}
	}

	private void finish(String idTask, String response) throws InterruptedException {
		JSONObject messagObject = new JSONObject()
				.put("id", idTask)
				.put("completed", true)
				.put("progress", 100)
				.put("result", response);
		rabbitTemplate.convertAndSend("tasksProgress", messagObject.toString());
	}
}