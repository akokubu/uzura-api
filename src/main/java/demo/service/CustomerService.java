package demo.service;

import java.util.List;

import org.seasar.doma.jdbc.SelectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import demo.datasource.CustomerRepository;
import demo.domain.CustomerEntity;

@Service
@Transactional
public class CustomerService {

	@Autowired
	CustomerRepository customerRepository;

	/**
	 * ID順に顧客全件取得する
	 * 
	 * @return 顧客リスト
	 */
	public List<CustomerEntity> findAll() {
		return customerRepository.findAllOrderByName();
	}

	/**
	 * 顧客情報を登録する
	 * 
	 * @param customerEntity
	 *            顧客情報
	 */
	public void register(CustomerEntity customerEntity) {
		customerRepository.insert(customerEntity);
	}

	/**
	 * ID順に顧客全件取得する。ページング処理付
	 * 
	 * 
	 * @param selectOptions オプション
	 * @return 顧客リスト
	 */
	public List<CustomerEntity> findAllWithPaging(SelectOptions selectOptions) {
		return customerRepository.findAllOrderById(selectOptions);
	}
}
