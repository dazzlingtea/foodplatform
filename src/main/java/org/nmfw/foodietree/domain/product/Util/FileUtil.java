package org.nmfw.foodietree.domain.product.Util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.global.service.AwsS3Service;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Component
@Slf4j
@Service
@RequiredArgsConstructor
public class FileUtil {

    private final AwsS3Service s3Service;

    public String uploadFile(String root, MultipartFile file) throws IOException {
        // 원본파일명을 중복이 없는 랜덤 파일명으로 변경
        String newFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String contentType = file.getContentType();

        String url = s3Service.uploadToS3Bucket(file.getBytes(), newFileName, contentType);

        return url;
    }
}
