package org.nmfw.foodietree.global.service;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.annotation.PostConstruct;
import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Service
@Slf4j
public class AwsS3Service {

    private S3Client s3;

    @Value("${aws.credentials.accessKey}")
    private String accessKey;

    @Value("${aws.credentials.secretKey}")
    private String secretKey;

    @Value("${aws.region}")
    private String region;

    @Value("${aws.bucketName}")
    private String bucketName;

    @PostConstruct
    public void initAmazonS3() {

        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
        this.s3 = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();

    }

    public void uploadFileToS3(File file, String key) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            s3.putObject(putObjectRequest, RequestBody.fromFile(file));
        } catch (Exception e) {
            throw new RuntimeException("S3 업로드 중 오류 발생", e);
        }
    }

    // 필요에 따라 파일 다운로드 및 기타 기능도 이 클래스에 구현할 수 있습니다.

    public String uploadToS3Bucket(byte[] uploadfile, String fileName, String contentType) {
        // 현재 날짜를 기반으로 폴더 생성
        String datePath = LocalDate.now().toString().replace("-", "/");
        String fullPath = datePath + "/" + fileName;

        // 업로드 수행
        try{
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fullPath)
                    .contentType(contentType) // MIME 타입 설정
                    .contentDisposition("inline")  // 브라우저에서 직접 보기 설정
                    .build();

            s3.putObject(request, RequestBody.fromBytes(uploadfile));

            // 업로드된 경로 url 반환
            return s3.utilities()
                    .getUrl(b -> b.bucket(bucketName).key(fullPath))
                    .toString()
                    ;
        } catch (Exception e) {
            log.error("S3 업로드 중 오류 발생!!!!", e);
            return null;
        }
    }
}
