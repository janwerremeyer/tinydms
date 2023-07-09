package me.werremeyer.tinydms.FileReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.*;
import org.hibernate.type.SqlTypes;

import java.sql.SQLType;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Entity
@DynamicInsert
public class FileReference {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Getter
    private UUID id;

    @Setter
    @Getter
    @Column(unique = true)
    private String filename;


    @Setter
    @Getter
    private long size;


    @Setter
    @Getter
    @JdbcTypeCode(SqlTypes.JSON)
    @ColumnDefault("'[]'")
    private List<String> tags;

    @Setter
    @Getter
    private String contentType;

    @CreationTimestamp
    @Getter
    private LocalDateTime created;

    @UpdateTimestamp
    @Getter
    private LocalDateTime updated;
}
