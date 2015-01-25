package demo.api;

import static com.jayway.restassured.RestAssured.when;
import static org.hamcrest.CoreMatchers.is;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.jayway.restassured.RestAssured;

import demo.UzuraApiApplication;
import demo.datasource.CustomerRepository;
import demo.domain.CustomerEntity;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = UzuraApiApplication.class)
@WebAppConfiguration
@IntegrationTest({
		"server.port:0",
		"spring:profiles.active:test"
})
public class CustomerRestControllerIntegrationTest {

	@Autowired
	CustomerRepository customerRepository;

	@Value("${local.server.port:0}")
	int port;

	CustomerEntity customer1 = new CustomerEntity(null, "どら", "えもん");
	CustomerEntity customer2 = new CustomerEntity(null, "野比", "のび太");

	@Before
	public void setUp() {
		customerRepository.deleteAll();
		customer1 = customerRepository.insert(customer1).getEntity();
		customer2 = customerRepository.insert(customer2).getEntity();
		RestAssured.port = port;
	}

	@Test
	public void 一覧取得() {
		when()
				.get("api/customers")
				.then()
				.statusCode(HttpStatus.OK.value())
				.body("id[0]", is(customer1.getId()))
				.body("lastName[0]", is(customer1.getLastName()))
				.body("firstName[0]", is(customer1.getFirstName()))
				.body("id[1]", is(customer2.getId()))
				.body("lastName[1]", is(customer2.getLastName()))
				.body("firstName[1]", is(customer2.getFirstName()));
	}

	@Test
	public void ID指定取得() {
		when()
				.get("api/customers/{id}", customer1.getId())
				.then()
				.statusCode(HttpStatus.OK.value())
				.body("id", is(customer1.getId()))
				.body("lastName", is(customer1.getLastName()))
				.body("firstName", is(customer1.getFirstName()));
	}

}
