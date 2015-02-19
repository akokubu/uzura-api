package demo.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import demo.domain.TaskEntity;
import demo.service.TaskService;

@RestController
@RequestMapping("api/tasks")
public class TaskRestController {

	@Autowired
	TaskService taskService;

	@RequestMapping(method = RequestMethod.GET)
	List<TaskEntity> getTasks() {
		return taskService.findAll();
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void deleteTask(@PathVariable Integer id) {
		taskService.delete(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	void registerTask(@Valid @RequestBody TaskRequest request) {
		TaskEntity taskEntity = new TaskEntity(request.getTitle(), request.getMemo());
		taskService.register(taskEntity);
	}

}
