import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useJsonPlaceholderApi, {
  JsonPlaceholderAlbumType,
  JsonPlaceholderPostType,
  JsonPlaceholderUserType,
} from "../../hooks/useJsonPlaceholderApi";
import Loading from "../../components/loading";
import { Col, Row } from "react-bootstrap";
import Box from "./components/box";

type UserDetailParamType = {
  userId: string | undefined;
};

export default function JsonPlaceholderUserDetailPage() {
  const [user, setUser] = useState<JsonPlaceholderUserType | null>(null);
  const [albums, setAlbums] = useState<JsonPlaceholderAlbumType[] | null>(null);
  const [posts, setPosts] = useState<JsonPlaceholderPostType[] | null>(null);

  const [initialized, setInitialized] = useState<boolean>(false);

  // TODO initialized state'i gerekli olup olmadığını düşün.

  const api = useJsonPlaceholderApi();
  const params: Readonly<Partial<UserDetailParamType>> =
    useParams<UserDetailParamType>();
  console.log(">> PARAMS", params);
  // >> PARAMS {userId: '5'}

  useEffect(() => {
    (async () => {
      // burada api çağır
      if (params.userId) {
        console.log(">> data isteğine başlıyoruz...");

        // bütün promise'leri bir diziye aktarıyoruz
        let promises = [];
        promises.push(api.getUser(parseInt(params.userId)));
        promises.push(api.albums(parseInt(params.userId)));
        promises.push(api.posts(parseInt(params.userId)));
        // ardından tüm bu promise'leri tek seferde çalıştırıyoruz.
        // inspect element ekranındayken network kısmına geldiğimizde
        // tüm requestlerin aynı anda başlatıldığını görebiliriz.
        // Bu durumda toplam bekleme süresi yaklaşık 2 saniye civarındadır.
        let results = await Promise.all(promises);
        console.log(">> responselar: ", results);

        // Tüm datalar geldi, ilgili dataları doğru type'ları belirterek
        // ilgili state'lere set ediyoruz.
        setUser(results[0] as JsonPlaceholderUserType);
        setAlbums(results[1] as JsonPlaceholderAlbumType[]);
        setPosts(results[2] as JsonPlaceholderPostType[]);

        // Tüm datalar geldi, o zaman initialized state'ini true yap.
        // setInitialized ifadesini en son çağırmak gerekiyor aksi halde
        // yukarıdaki state'ler set edilmemiş olur ve hata alırız.
        setInitialized(true);

        // await'leri sırayla beklersek bu çok uzun sürer. Tüm requestler
        // sırayla çalışır ve toplamda bekleme süresi en az 6 saniyedir.
        //let userDetail = await api.getUser(parseInt(params.userId));
        //let albums = await api.albums(parseInt(params.userId));
        //let posts = await api.posts(parseInt(params.userId));
        //console.log(">> responselar: ", userDetail, albums, posts);
      }
    })();
  }, []);

  console.log(">> DATALAR", user, albums, posts);

  if (!initialized) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">User Details</h1>
      </div>
      <Row>
        <Col sm="3">
          <strong>Name: </strong>
          {user?.name}
        </Col>
        <Col sm="3">
          <strong>Email: </strong>
          {user?.email}
        </Col>
        <Col sm="3">
          <strong>Phone: </strong>
          {user?.phone}
        </Col>
        <Col sm="3">
          <strong>Website: </strong>
          {user?.website}
        </Col>
      </Row>

      <hr />

      <div className="p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">User Albums</h1>
      </div>

      <Row>
        {albums?.map((album: JsonPlaceholderAlbumType, index) => {
          return (
            <Col sm="3">
              <Box album={album} boxTitle="Albüm" linkTarget="albums" />
            </Col>
          );
        })}
      </Row>

      <hr />

      <div className="p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">User Posts</h1>
      </div>

      <Row>
        {posts?.map((post: JsonPlaceholderPostType, index) => {
          return (
            <Col sm="3">
              <Box album={post} boxTitle="Blog Post" linkTarget="posts" />
            </Col>
          );
        })}
      </Row>
    </>
  );
}