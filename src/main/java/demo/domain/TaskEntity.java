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
@Table(name = "tasks")
@EqualsAndHashCode
@ToString(includeFieldNames = false)
public class TaskEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	private final Integer id;

	@Getter
	private final String title;

	@Getter
	private final String memo;

	public TaskEntity(String title, String memo) {
		// DBの自動採番を使うためnullを設定
		this.id = null;
		this.title = title;
		this.memo = memo;
	}
	
	public TaskEntity(Integer id, String title, String memo) {
		this.id = id;
		this.title = title;
		this.memo = memo;
	}	
}
