import './Footer.css';

const menu = ['고객센터', '자주하는 질문', '멤버십 서비스', '회사소개', '매장 찾기'];

function Divider({ company = false }) {
    return <span className="footer__divider" aria-hidden="true"><img src={`/images/footer/${company ? 'company' : 'menu'}-divider.svg`} alt="" /></span>;
}

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__canvas">
                <ul className="footer__menu" aria-label="안내 메뉴">
                    {menu.map((label, index) => <li key={label}>{index > 0 && <Divider />}<span>{label}</span></li>)}
                </ul>
                <div className="footer__tiger" aria-hidden="true"><img src="/images/footer/tiger.svg" alt="" /></div>
                <p className="footer__title">Onitsuka Tiger</p>
                <div className="footer__customer">
                    <p>고객 상담실</p>
                    <p className="footer__phone">080-929-3535 / 080-930-3535</p>
                </div>
                <div className="footer__registration">
                    <p>사업자등록번호 : 109-86-10809</p>
                    <p>통신판매신고 2018-서울중구-0740</p>
                    <p>대표 전화 : 02-3663-8335</p>
                </div>
                <div className="footer__company">
                    <p className="footer__company-name"><span>(주) 아식스 코리아</span><Divider company /><span>대표 : 김원무</span></p>
                    <p>주소 : 서울특별시 중구 을지로 5길 16, 삼화타워 14층</p>
                </div>
                <div className="footer__copyright">
                    <p>© 2026 Onitsuka Tiger Korea</p>
                    <p className="footer__trademark">ONITSUKA TIGER IS A REGISTERED TRADEMARK OF<br />ASICS CORPORATION</p>
                </div>
            </div>
        </footer>
    );
}
