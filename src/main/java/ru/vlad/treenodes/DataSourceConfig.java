package ru.vlad.treenodes;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

//@Configuration
public class DataSourceConfig {

    public DataSourceConfig() {
    }

//    @Bean(name="dataSource")
    public DataSource getDataSource(){
        // Создаем источник данных
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        // Задаем параметры подключения к базе данных
        dataSource.setUrl("jdbc:postgresql://localhost:5432/tree-nodes");
        dataSource.setUsername("postgres");
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setPassword("0000");
        return dataSource;
    }

}
