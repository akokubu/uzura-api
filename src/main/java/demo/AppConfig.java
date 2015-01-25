package demo;

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
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class AppConfig {

	@Autowired
	private DataSourceProperties properties;

	DataSource realDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		// FIXME 環境変数から取る
		dataSource.setDriverClassName(properties.getDriverClassName());
		dataSource.setUrl(properties.getUrl());
		dataSource.setUsername(properties.getUsername());
		dataSource.setPassword(properties.getPassword());
		return dataSource;
	}

	@Bean
	DataSource dataSource() {
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
				return dataSource();
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
