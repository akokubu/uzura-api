package demo.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import org.seasar.doma.Entity;
import org.seasar.doma.GeneratedValue;
import org.seasar.doma.GenerationType;
import org.seasar.doma.Id;
import org.seasar.doma.Table;
import org.seasar.doma.jdbc.entity.NamingType;

@Entity(naming = NamingType.SNAKE_UPPER_CASE, immutable = true)
@Table(name = "customers")
@EqualsAndHashCode
@ToString(includeFieldNames = false)
public class CustomerEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private final Integer id;

	@Getter
	private final String lastName;

	@Getter
	private final String firstName;

	public CustomerEntity(String lastName, String firstName) {
		// DBの自動採番を使うためnullを設定
		this.id = null;
		this.lastName = lastName;
		this.firstName = firstName;
	}

	public CustomerEntity(Integer id, String lastName, String firstName) {
		this.id = id;
		this.lastName = lastName;
		this.firstName = firstName;
	}
}
