package demo.datasource;

import java.util.List;

import org.seasar.doma.Dao;
import org.seasar.doma.Delete;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.Update;
import org.seasar.doma.jdbc.Result;
import org.seasar.doma.jdbc.SelectOptions;

import demo.domain.CustomerEntity;

@DomaRepository
@Dao
public interface CustomerRepository {

	@Select
	public List<CustomerEntity> findAllOrderByName();

	@Select
	public List<CustomerEntity> findAllOrderById(SelectOptions selectOptions);

	@Select
	public CustomerEntity findById(Integer id);

	@Insert
	public Result<CustomerEntity> insert(CustomerEntity customerEntity);

	@Update
	public Result<CustomerEntity> update(CustomerEntity customerEntity);

	@Delete
	public Result<CustomerEntity> delete(CustomerEntity customerEntity);

	@Delete(sqlFile = true)
	public int deleteAll();
}
