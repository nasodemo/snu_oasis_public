import styles from './login.module.css'

export default function threshold1() {
    return (
        <div className={styles.logincontainer}>
            <h1>Login</h1>
            <form>
                <input className={styles.text} placeholder="아이디" id="username" required />
                <br/>
                <input  className={styles.password} placeholder="비밀번호" id="password" required />
                <p></p>
                <button className={styles.submit}>로그인</button>
            </form>
        </div>
    );
}