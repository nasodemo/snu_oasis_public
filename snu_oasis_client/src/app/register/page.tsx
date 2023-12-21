import styles from './register.module.css'

export default function threshold1() {
    return (
        <div className={styles.logincontainer}>
            <h2>회원가입</h2>
            <form>
            <input  className={styles.password} placeholder="학년" id="grade" required />
                <input className={styles.text} placeholder="아이디" id="reusername" required />
                <br/>
                <input  className={styles.password} placeholder="비밀번호" id="repassword" required />
                <br/>
                <input  className={styles.password} placeholder="비밀번호 재입력" id="checkpassword" required />
                <p></p>
                <button className={styles.submit}>회원가입하기</button>
            </form>
        </div>
    );
}