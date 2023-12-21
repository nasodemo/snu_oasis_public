import styles from './layout.module.css';
import Link from 'next/link';
import { GoHomeFill } from 'react-icons/go';
import { TbHelpOctagon } from 'react-icons/tb';

export const metadata = {
  title: 'snu-oasis',
  description: 'Study difference Sights and Make further questions for New World',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={styles.container}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <div className={styles.maxwidth}>
          <nav className={styles.navbar}>
            <div className={styles.inlinenavbar}>
                <Link aria-label="Home" href="/">
                  <GoHomeFill className={`${styles.iconWhite} ${styles.iconLarge}`} />
                </Link>
              
             <p style={{fontSize:'25pt', fontWeight:'bold', lineHeight:'0'}}>OASIS</p>
             
                <Link aria-label="about" href="/about" className={styles.noTextDecoration}>
                  <div className={styles.iconWhite}>
                    <TbHelpOctagon className={styles.iconLarge} />
                  </div>
                </Link>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
