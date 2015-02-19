package demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import demo.datasource.TaskRepository;
import demo.domain.TaskEntity;

@Service
@Transactional
public class TaskService {

	@Autowired
	TaskRepository taskRepository;

	/**
	 * ID順に全件取得する
	 * 
	 * @return タスクリスト
	 */
	public List<TaskEntity> findAll() {
		return taskRepository.findAll();
	}

	/**
	 * タスクを登録する
	 * 
	 * @param taskEntity タスク
	 */
	public void register(TaskEntity taskEntity) {
		taskRepository.insert(taskEntity);
	}

	/**
	 * ID指定でタスクを取得する。
	 * 
	 * @param id 顧客ID
	 * @return タスク 
	 */
	public TaskEntity findById(Integer id) {
		return taskRepository.findById(id);
	}

	/**
	 * タスクを削除する。
	 * 
	 * @param id ID
	 */
	public void delete(Integer id) {
		TaskEntity taskEntity = taskRepository.findById(id);
		taskRepository.delete(taskEntity);
	}
}
