package demo.api;

import static com.jayway.restassured.RestAssured.given;
import static com.jayway.restassured.RestAssured.when;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.seasar.doma.jdbc.SelectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.jayway.restassured.RestAssured;
import com.jayway.restassured.config.EncoderConfig;
import com.jayway.restassured.config.RestAssuredConfig;
import com.jayway.restassured.http.ContentType;

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

	@Test
	public void 新規登録() {
		List<CustomerEntity> lists = customerRepository.findAllOrderByid(SelectOptions.get());
		Integer id = lists.get(lists.size() - 1).getId() + 1;
		CustomerEntity SIZUKA_CHAN = new CustomerEntity(id, "源", "しずか");

		given()
				.contentType(ContentType.JSON)
				.config(getUTFConfig())
				.body(String.format("{ \"lastName\":\"%s\", \"firstName\":\"%s\" }", SIZUKA_CHAN.getLastName(), SIZUKA_CHAN.getFirstName()))
				.when()
				.post("/api/customers")
				.then()
				.statusCode(HttpStatus.CREATED.value());

		assertThat(customerRepository.findById(id), is(SIZUKA_CHAN));
	}

	private RestAssuredConfig getUTFConfig() {
		return new RestAssuredConfig().encoderConfig(
				EncoderConfig.encoderConfig().defaultContentCharset("UTF-8"));
	}
}
