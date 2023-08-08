import React, { useContext } from 'react';
import { Button, Col, Image, Row, Skeleton, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import { FiHelpCircle } from 'react-icons/fi';
import { dataCompanyContext } from '../../../../contexts/dataCompany.context';
import '../../../responsiveApp.css';

const styles = createUseStyles({
  header: {
    width: '100%',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 50px 0 50px',
  },
  logo: {
    borderRadius: '50%',
    objectFit: 'cover',
  },
  containerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  hiddenNamecompany: {
    '@media(max-width:500px)': {
      display: 'none',
    },
  },
});
export default function Header() {
  const { header, logo, containerHeader, hiddenNamecompany } = styles();
  const { dataCompany, load } = useContext(dataCompanyContext);
  const OrderId = JSON.parse(localStorage.getItem('@OrderId') as any);
  return (
    <>
      <header
        style={{
          background: !dataCompany?.backgroundColor
            ? '#5B72F2'
            : dataCompany?.backgroundColor,
        }}
        className={header}
      >
        {load ? (
          <Skeleton
            active
            avatar
            paragraph={{
              rows: 0,
              width: '100%',
            }}
          ></Skeleton>
        ) : (
          <Row className={containerHeader}>
            <Col>
              <Row
                style={{ alignItems: 'center', gap: '20px', height: '100%' }}
              >
                <Image
                  className={logo}
                  src={
                    dataCompany?.imgProfile
                      ? dataCompany?.imgProfile
                      : 'https://via.placeholder.com/150'
                  }
                  alt=""
                ></Image>
                <Typography.Title
                  className={hiddenNamecompany}
                  onClick={() =>
                    (window.location.href = `/${dataCompany?.name_company}`)
                  }
                  style={{ color: '#fff', cursor: 'pointer' }}
                  level={4}
                >
                  {dataCompany?.name_company}
                </Typography.Title>
              </Row>
            </Col>
            <Col>
              <Row
                style={{ alignItems: 'center', gap: '10px', height: '100%' }}
              >
                <Row style={{ position: 'relative' }}>
                  <Typography.Link
                    className="responsivemeusPedidosBtn"
                    style={{ color: '#fff' }}
                    href={`/${dataCompany?.name_company}/meusPedidos/${OrderId}`}
                  >
                    Meus pedidos
                  </Typography.Link>
                </Row>

                {window.screen.width > 500 ? (
                  <Button
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <Row>
                      <Typography.Text> Ajuda</Typography.Text>
                    </Row>
                    <Row>
                      <FiHelpCircle color="#000"></FiHelpCircle>
                    </Row>
                  </Button>
                ) : (
                  <Button
                    title="Ajuda"
                    type="text"
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <FiHelpCircle size={20} color="#fff"></FiHelpCircle>
                  </Button>
                )}
              </Row>
            </Col>
          </Row>
        )}
      </header>
    </>
  );
}
