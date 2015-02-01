package demo;

import java.net.URI;
import java.net.URISyntaxException;

import javax.sql.DataSource;

import net.sf.log4jdbc.Log4jdbcProxyDataSource;

import org.seasar.doma.jdbc.Config;
import org.seasar.doma.jdbc.NoCacheSqlFileRepository;
import org.seasar.doma.jdbc.SqlFileRepository;
import org.seasar.doma.jdbc.dialect.Dialect;
import org.seasar.doma.jdbc.dialect.MysqlDialect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
@EnableTransactionManagement
public class AppConfig {

	@Autowired
	private DataSourceProperties properties;

	@Order(Ordered.HIGHEST_PRECEDENCE)
	@Bean
	CharacterEncodingFilter characterEncodingFilter() {
		CharacterEncodingFilter filter = new CharacterEncodingFilter();
		filter.setEncoding("UTF-8");
		filter.setForceEncoding(true);
		return filter;
	}

	DataSource realDataSource() throws URISyntaxException {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(properties.getDriverClassName());
		String url, username, password;
		String databaseUrl = System.getenv("CLEARDB_DATABASE_URL");
		if (databaseUrl != null) {
			URI dbUri = new URI(databaseUrl);
			Integer port = dbUri.getPort();
			if (port < 0) {
				port = 3306;
			}
			url = "jdbc:mysql://" + dbUri.getHost() + ":" + port + dbUri.getPath() + "&characterEncoding=utf8";
			username = dbUri.getUserInfo().split(":")[0];
			password = dbUri.getUserInfo().split(":")[1];
		} else {
			url = properties.getUrl();
			username = properties.getUsername();
			password = properties.getPassword();
		}

		dataSource.setUrl(url);
		dataSource.setUsername(username);
		dataSource.setPassword(password);

		return dataSource;
	}

	@Bean
	DataSource dataSource() throws URISyntaxException {
		return new TransactionAwareDataSourceProxy(
				new Log4jdbcProxyDataSource(
						this.realDataSource()
				));
	}

	@Bean
	Dialect dialect() {
		return new MysqlDialect();
	}

	@Bean
	SqlFileRepository sqlFileRepository() {
		return new NoCacheSqlFileRepository();
	}

	@Bean
	Config config() {
		return new Config() {

			@Override
			public DataSource getDataSource() {
				try {
					return dataSource();
				} catch (URISyntaxException e) {
					throw new RuntimeException(e);
				}
			}

			@Override
			public Dialect getDialect() {
				return dialect();
			}

			@Override
			public SqlFileRepository getSqlFileRepository() {
				return sqlFileRepository();
			}
		};
	}
}
