import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useJsonPlaceholderApi from "../../hooks/useJsonPlaceholderApi";

type UserDetailParamType = {
  userId: string | undefined;
};

export default function JsonPlaceholderUserDetailPage() {
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

        // await'leri sırayla beklersek bu çok uzun sürer. Tüm requestler
        // sırayla çalışır ve toplamda bekleme süresi en az 6 saniyedir.
        //let userDetail = await api.getUser(parseInt(params.userId));
        //let albums = await api.albums(parseInt(params.userId));
        //let posts = await api.posts(parseInt(params.userId));
        //console.log(">> responselar: ", userDetail, albums, posts);
      }
    })();
  }, []);

  return (
    <>
      user details Page
      <hr />
      {params.userId}
    </>
  );
}