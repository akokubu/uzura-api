package demo.api;

import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.validator.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

	@NotEmpty
	@Size(min = 1, max = 50)
	private String title;

	@NotEmpty
	@Size(min = 1, max = 255)
	private String memo;
}
