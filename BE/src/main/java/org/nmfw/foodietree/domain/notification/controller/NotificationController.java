package org.nmfw.foodietree.domain.notification.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.notification.dto.req.NotifyIdListDto;
import org.nmfw.foodietree.domain.notification.dto.res.MessageDto;
import org.nmfw.foodietree.domain.notification.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.nmfw.foodietree.domain.auth.security.TokenProvider.*;

@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

    private final NotificationService notificationService;

    // 접속 시 알림 리스트 조회
    @GetMapping
    public ResponseEntity<?> getNotifications(
            @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        String userEmail = userInfo.getEmail();
        List<MessageDto> list = notificationService.getList(userEmail);

        return ResponseEntity.ok().body(list);
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<?> markOneAsRead(@PathVariable Long id) {
        try {
            // 알림 읽음 처리
            boolean b = notificationService.markOneAsRead(id);
            return b ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("알림 읽음 처리 중 오류 발생");
        }
    }
    @PatchMapping("/all")
    public ResponseEntity<Object> markAllAsRead(@RequestBody NotifyIdListDto dto) {
        log.debug("\n 알림 id {}", dto);
        try {
            boolean flag = notificationService.markAllAsRead(dto.getIds());
            return flag ? ResponseEntity.ok().body(true) : ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("알림 전체 읽음 처리 중 오류 발생", e);
            return ResponseEntity.internalServerError().body("알림 전체 읽음 처리 중 오류 발생" + e.getMessage());
        }
    }

}
