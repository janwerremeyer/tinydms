package me.werremeyer.tinydms;

import me.werremeyer.tinydms.Storage.config.AWSCredentialsConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.BufferedImageHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.awt.image.BufferedImage;


@SpringBootApplication
@EnableConfigurationProperties(AWSCredentialsConfiguration.class)
public class BackendServiceApplication {

    @Bean
    public HttpMessageConverter<BufferedImage> bufferedImageHttpMessageConverter() {
        return new BufferedImageHttpMessageConverter();
    }


    @Configuration
    public class WebConfig
    {
        @Bean
        public WebMvcConfigurer corsConfigurer()
        {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**")
                            .allowedOrigins("http://localhost:5173")
                            .allowCredentials(true);
                }
            };
        }
    }


    public static void main(String[] args) {
        SpringApplication.run(BackendServiceApplication.class, args);
    }

}
