package com.example.demo.config;

import java.sql.Types;

import org.hibernate.dialect.SQLServerDialect;

public class MySQLServerDialect extends SQLServerDialect {

    @Override
    protected String columnType(int sqlTypeCode) {
        return switch (sqlTypeCode) {
            case Types.VARCHAR -> "nvarchar(255)";
            case Types.LONGVARCHAR -> "nvarchar(max)";
            default -> super.columnType(sqlTypeCode);
        };
    }
}
