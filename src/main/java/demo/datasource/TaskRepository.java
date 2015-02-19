package demo.datasource;

import java.util.List;

import org.seasar.doma.Dao;
import org.seasar.doma.Delete;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.Update;
import org.seasar.doma.jdbc.Result;

import demo.domain.TaskEntity;

@DomaRepository
@Dao
public interface TaskRepository {

	@Select
	public List<TaskEntity> findAll();

	@Select
	public TaskEntity findById(Integer id);

	@Insert
	public Result<TaskEntity> insert(TaskEntity customerEntity);

	@Update
	public Result<TaskEntity> update(TaskEntity customerEntity);

	@Delete
	public Result<TaskEntity> delete(TaskEntity customerEntity);
}
