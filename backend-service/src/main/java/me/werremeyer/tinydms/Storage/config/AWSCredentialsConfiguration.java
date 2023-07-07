package me.werremeyer.tinydms.Storage.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@Getter
@Setter
@ConfigurationProperties("aws.credentials")
public class AWSCredentialsConfiguration {
    public String AccessKeyId;
    public String SecretAccessKey;
}
