insert into signup (email, code) values ('constant@gmail.com', 'CTCODE');

set global event_scheduler = on;

create event delete_old_signup_record
on schedule every 1 minute
comment "오래된 회원 가입 인증 코드들 삭제"
do
delete from signup
where id != 1 and created_at <= now() - interval 5 minute;
