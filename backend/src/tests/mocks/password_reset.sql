insert into password_reset (user_id, code) values(1, "CTCODE");

set global event_scheduler = on;
create event delete_old_password_reset_record
on schedule every 1 minute
comment "오래된 비밀번호 인증 코드들 삭제"
do
delete from password_reset
where id != 1 and created_at <= now() - interval 5 minute;