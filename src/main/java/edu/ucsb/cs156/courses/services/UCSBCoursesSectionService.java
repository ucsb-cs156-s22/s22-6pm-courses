package edu.ucsb.cs156.courses.services;
    

import java.util.List;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod; 
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import edu.ucsb.cs156.courses.entities.UCSBSubject;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;

import org.springframework.web.client.HttpClientErrorException;

@Slf4j
@Service("UCSBCoursesSection")

public class UCSBCoursesSectionService {

    private Logger logger = LoggerFactory.getLogger(UCSBCurriculumService.class);

    @Value("${app.ucsb.api.consumer_key}")
    private String apiKey;

    private RestTemplate restTemplate = new RestTemplate();

    public UCSBCoursesSectionService(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder.build();
    }

    public static final String ENDPOINT = "https://api.ucsb.edu/academics/curriculums/v3/classsection";

    //{quarter}/{enrollcode}
    public String getJSON(String subjectArea, String quarter, String enrollCode) {

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("ucsb-api-version", "1.0");
        headers.set("ucsb-api-key", this.apiKey);

        HttpEntity<String> entity = new HttpEntity<>("body", headers);

        String params = String.format(
                "?quarter=%s&enrollCode=%s", quarter,
                subjectArea, enrollCode);
        String url = ENDPOINT + params;

        if (enrollCode.equals("A")) {
            params = String.format(
                    "?quarter=%s&enrollCode=%s",
                    quarter, subjectArea);
            url = ENDPOINT + params;
        }

        logger.info("url=" + url);

        String retVal = "";
        MediaType contentType=null;
        HttpStatus statusCode=null;
        try {
            ResponseEntity<String> re = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            contentType = re.getHeaders().getContentType();
            statusCode = re.getStatusCode();
            retVal = re.getBody();
        } catch (HttpClientErrorException e) {
            retVal = "{\"error\": \"401: Unauthorized\"}";
        }
        logger.info("json: {} contentType: {} statusCode: {}",retVal,contentType,statusCode);
        return retVal;
    }


}

