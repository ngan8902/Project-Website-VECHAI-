import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaAngleDown, FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsChevronRight, BsArrowRightShort, BsArrowUpCircleFill } from "react-icons/bs";

import styles from '@/styles/Home.module.css';



export default function Home() {
  const isBrowser = () => typeof window !== 'undefined';


  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return <>
    <Head>
      <title>Trang chủ</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="ico" href="/favicon.ico"></link>
    </Head>
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.text}>VeChai</div>
      </div>
      <div>
        <ul className={styles.list1}>
          <div className={styles.dropdown}>
            <li className={styles.nd}>Người Dùng <FaAngleDown className={styles.icon} />
              <div className={styles.drop}>
                <a href="#">Chủ Vựa</a>
                <a href="#">Người Bán</a>
                <a href="#">Người Thu Mua</a>
              </div>
            </li>
          </div>
          <li><Link className={styles.linknav} href="#sanpham">Sản Phẩm</Link></li>
          <li><Link className={styles.linknav} href="#">Giới Thiệu</Link></li>
          <li className={styles.dn}><Link className={styles.linknav} href="/Login">Đăng Nhập</Link></li>
          <button><a href='/Signup' className={styles.btdt}>Dùng Thử</a></button>
        </ul>
      </div>
    </nav>
    <div className={styles.home}>
      <div className={styles.gt}>
        <Image
          className={styles.imgHand}
          src={'/shakeHand.jpg'}
          width={500}
          height={300}
        />
        <div className={styles.content}>
          <h1 style={{ color: '#070a73' }}>MUA & BÁN VE CHAI<br /> TIỆN HƠN</h1>
          <p style={{ color: '#6c5a5a' }}>Website dành cho hoạt động mua bán ve chai diễn ra tiện lợi hơn <br /> với công nghệ hỗ trợ tìm kiếm người mua và người bán.</p>
          <button style={{ marginLeft: '0px' }}><a href='/Signup' className={styles.btdt}>Dùng Thử</a></button>
          <p style={{ cursor: 'pointer', color: 'black' }}><a style={{ paddingLeft: '0px' }} href='/Login' className={styles.linknav}>
            hoặc đăng nhập<BsChevronRight className={styles.icright} /></a></p>
        </div>
      </div>

      <div className={styles.spContent} id="sanpham">
        <div className={styles.textSanpham}>
          <h1 className={styles.textsp}>Sản Phẩm</h1>
        </div>
        <div className={styles.imgSanpham}>
          <div className={styles.imgSanpham1}>
            <Image
              src={"/sanpham/chainhua.jpg"}
              width={200}
              height={200}
            />
            <h5>Chai Nhựa PVC</h5>
            <p className={styles.gia}>Giá: 18.000/kg </p>
            <div className={styles.cart}>
              Thêm vào giỏ hàng
            </div>
          </div>
          <div className={styles.imgSanpham1}>
            <Image
              src={"/sanpham/giayphelieu.jpg"}
              width={200}
              height={200}
            />
            <h5>Giấy Viết</h5>
            <p className={styles.gia}>Giá: 18.000/kg </p>
            <div className={styles.cart}>
              Thêm vào giỏ hàng
            </div>
          </div>
          <div className={styles.imgSanpham1}>
            <Image
              src={"/sanpham/lonnuoc.jpg"}
              width={200}
              height={200}
            />
            <h5>Lon Nước</h5>
            <p className={styles.gia}>Giá: 15.000/kg </p>
            <div className={styles.cart}>
              Thêm vào giỏ hàng
            </div>
          </div>
          <div className={styles.imgSanpham1}>
            <Image
              src={"/sanpham/thungcatton.jpg"}
              width={200}
              height={200}
            />
            <h5>Thùng Catton</h5>
            <p className={styles.gia}>Giá: 15.000/kg </p>
            <div className={styles.cart}>
              Thêm vào giỏ hàng
            </div>
          </div>
        </div>
      </div>


      <div className="grid-container">
        <div className={styles.content1}>
          <Image
            src="/woman2.jpg"
            width={80}
            height={80}
            style={{ marginBottom: '10px' }}
          />
          <h4>
            Người Cần Bán Ve Chai
          </h4>
          <p style={{ color: 'GrayText', fontSize: '0.75rem' }}>
            Đăng thông báo có ve chai cần bán và tìm vựa ve chai gần nhất.
          </p>
          <a href="#" style={{ cursor: 'pointer', fontFamily: 'math', background: 'none' }}>
            Tìm hiểu thêm<BsArrowRightShort />
          </a>

        </div>

        <div className={styles.content1}>
          <Image
            src="/woman.jpg"
            width={80}
            height={80}
            style={{ marginBottom: '10px' }}
          />
          <h4>
            Người Thu Mua Ve Chai
          </h4>
          <p style={{ color: 'GrayText', fontSize: '0.75rem' }}>
            Nhận thông báo có người cần bán ve chai và xem bản giá của các vựa ve chai.
          </p>
          <a href="#" style={{ cursor: 'pointer', fontFamily: 'math', background: 'none' }}>
            Tìm hiểu thêm<BsArrowRightShort />
          </a>

        </div>

        <div className={styles.content1}>
          <Image
            src="/man.jpg"
            width={80}
            height={80}
            style={{ marginBottom: '10px' }}
          />
          <h4>
            Chủ Vựa Ve Chai
          </h4>
          <p style={{ color: 'GrayText', fontSize: '0.75rem' }}>
            Kết nối đến nhiều người thu mua ve chai và khách hàng cần bán ve chai.
          </p>
          <a href="#" style={{ cursor: 'pointer', fontFamily: 'math', background: 'none' }}>
            Tìm hiểu thêm<BsArrowRightShort />
          </a>
        </div>
      </div>

      <div className="grid-container">
        <div className={styles.mapImg}>
          <Image
            src="/map.jpg"
            width={200}
            height={130}
          />
        </div>
        <div className={styles.content2}>
          <h3 style={{ fontWeight: '700', color: '#070a73', margin: '0' }}>
            Tham gia với chúng tôi để tiện lợi hóa quá trình mua bán ve chai của bạn.
          </h3>
          <p style={{ color: 'GrayText', fontSize: '0.85rem', margin: '0', padding: '0' }}>
            Mua bán thuận lợi hơn, tiết kiệm thời gian hơn.</p>

        </div>
      </div>
    </div>

    <button
      id='myBtn' onClick={scrollToTop}>
      <BsArrowUpCircleFill />
    </button>

    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.text} style={{ color: 'white' }}>VeChai</div>
      </div>
      <div className={styles.footerContent}>
        <h4 className={styles.text1}>VỀ CHÚNG TÔI</h4>
        <div className={styles.icon1}>
          <Link href="#" className={styles.iconContent}><FaTwitter /></Link>
          <Link href="#" className={styles.iconContent}> <FaFacebookSquare /></Link>
          <Link href="#" className={styles.iconContent}> <FaInstagram /></Link>
        </div>
      </div>
    </footer>

    <div className="credits ml-auto">
      <div className={styles.copyright}>
        Copyright  &copy; {1900 + new Date().getYear()}, made with{" "}
        <i className="fa fa-heart heart" /> by Bich Ngan
      </div>
    </div>
  </>
}

