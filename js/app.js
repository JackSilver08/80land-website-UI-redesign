
import { navigate } from './router.js';
import { provinces, listings, chats, notifications, categoryImages } from './data.js';

const app = document.querySelector('#app');

function icon(name) {
  return '<span class="material-symbols-outlined align-middle" aria-hidden="true">' + name + '</span>';
}

function layout(content) {
  return header() + content + mobileNav();
}

function header() {
  return [
    '<header class="site-header"><div class="container-xl"><div class="inner d-flex align-items-center gap-3 py-2">',
      '<a class="brand flex-shrink-0" href="/" data-link><span class="brand-mark">',
        icon('home'),
      '</span><span class="brand-copy"><strong>80Land</strong><span>Tìm phòng nhanh</span></span></a>',
      '<div class="vr d-none d-md-block"></div>',
      '<button class="header-icon d-none d-md-grid" data-tooltip="Khu vực">' + icon('location_on') + '</button>',
      '<label class="search-control flex-grow-1"><span>' + icon('search') + '</span><input placeholder="Tìm phòng, khu vực, quận huyện..."></label>',
      '<div class="d-flex align-items-center gap-1">',
        '<a href="/saved" data-link class="header-icon" data-tooltip="Tin đã lưu">' + icon('favorite') + '<span class="count">3</span></a>',
        '<a href="/messages" data-link class="header-icon" data-tooltip="Tin nhắn">' + icon('chat_bubble') + '</a>',
        '<a href="/notifications" data-link class="header-icon" data-tooltip="Thông báo">' + icon('notifications') + '<span class="count">3</span></a>',
        '<a href="/profile" data-link class="header-icon" data-tooltip="Tài khoản">' + icon('person') + '</a>',
        '<a href="/landlord" data-link class="btn btn-sm btn-80-primary ms-1 rounded-80 d-none d-md-inline-flex align-items-center gap-1 px-3">' + icon('add') + ' Đăng tin</a>',
      '</div>',
    '</div></div></header>',
    '<div class="utility-bar py-2"><div class="container-xl d-flex justify-content-between gap-3 flex-wrap">',
      '<div><span class="text-success fw-semibold">● Cập nhật 09:30 hôm nay</span> · Đã kiểm duyệt <strong>1.420 phòng mới</strong></div>',
      '<div class="d-flex gap-3"><span>🛡 Bảo vệ cọc 100%</span><span class="text-danger">📣 Báo cáo tin ảo nhận thưởng</span><strong>Hotline: 1900 8080</strong></div>',
    '</div></div>'
  ].join('');
}

function mobileNav() {
  const items = [
    ['/','home','Trang chủ'],
    ['/search','search','Tìm phòng'],
    ['/landlord','add','Đăng tin'],
    ['/saved','favorite','Đã lưu'],
    ['/profile','person','Tài khoản']
  ];
  return '<nav class="mobile-bottom fixed-bottom bg-white border-top"><div class="container-fluid"><div class="row g-0 text-center">' +
    items.map(function (item) {
      return '<div class="col"><a href="' + item[0] + '" data-link class="d-block py-2 small text-secondary"><div>' + icon(item[1]) + '</div><span>' + item[2] + '</span></a></div>';
    }).join('') +
    '</div></div></nav>';
}

function propertyCard(item) {
  return [
    '<div class="property-card card-80">',
      '<div class="property-media"><img src="' + item.image + '" alt="' + item.title.replace(/"/g, '&quot;') + '" loading="lazy"><button class="favorite" type="button" data-save="' + item.id + '">' + icon('favorite_border') + '</button></div>',
      '<div class="property-body">',
        '<div class="property-price">' + item.price + '/tháng</div>',
        '<div class="property-title">' + item.title + '</div>',
        '<div class="property-meta">📍 ' + item.location + ' · ' + item.area + '</div>',
        '<div class="d-flex flex-wrap gap-1 mt-2">',
          item.features.slice(0, 2).map(function (feature) {
            return '<span class="badge rounded-pill bg-light text-dark border">' + feature + '</span>';
          }).join(''),
          item.verified ? '<span class="badge-verified">' + icon('verified') + ' Chính chủ</span>' : '',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
}

function hero() {
  return [
    '<section class="hero-stage">',
      '<div class="hero-banner">',
        '<div class="container-xl position-relative h-100">',
          '<div class="hero-message">',
            '<span class="hero-kicker">' + icon('home_work') + ' 80LAND RENTAL</span>',
            '<h1>Tìm nơi ở phù hợp<br>với cuộc sống của bạn</h1>',
            '<p>Phòng trọ, căn hộ, nhà nguyên căn và ở ghép được sắp xếp để bạn tìm nhanh hơn.</p>',
            '<div class="hero-message-actions">',
              '<a href="/search" data-link class="btn btn-80-primary">Khám phá phòng</a>',
              '<a href="/map" data-link class="btn btn-light border">🗺 Tìm quanh tôi</a>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',
      '<div class="hero-orbit" aria-hidden="true"></div>',
      '<div class="search-box hero-search">',
        '<div class="search-tabs">',
          '<button class="search-tab active" type="button">🛏 Phòng trọ & Căn hộ</button>',
          '<button class="search-tab" type="button">♙ Tìm người ở ghép</button>',
          '<button class="search-tab" type="button">⌂ Nhà nguyên căn</button>',
          '<button class="search-tab" type="button">▥ Mặt bằng & Kiot</button>',
        '</div>',
        '<div class="row g-2 mt-2">',
          '<div class="col-12 col-md-6 col-lg-3"><div class="filter-field"><small>Khu vực</small><strong>Toàn TP. Hồ Chí Minh</strong></div></div>',
          '<div class="col-12 col-md-6 col-lg-3"><div class="filter-field"><small>Loại hình</small><strong>Tất cả loại hình</strong></div></div>',
          '<div class="col-12 col-md-6 col-lg-2"><div class="filter-field"><small>Mức giá</small><strong>3–6 triệu</strong></div></div>',
          '<div class="col-12 col-md-6 col-lg-2"><div class="filter-field"><small>Tiện ích</small><strong>WC riêng, gác</strong></div></div>',
          '<div class="col-12 col-lg-2 d-grid"><button class="btn btn-80-primary" data-go="/search">' + icon('search') + ' Tìm kiếm</button></div>',
        '</div>',
        '<div class="d-flex flex-wrap align-items-center gap-2 mt-3"><strong class="small text-secondary">Tìm nhanh</strong><span class="quick-pill">Gần ĐH Bách Khoa</span><span class="quick-pill">Studio Bình Thạnh</span><span class="quick-pill">Có ban công</span><span class="quick-pill">Pet-friendly</span></div>',
      '</div>',
    '</section>'
  ].join('');
}

function homePage() {
  return [
    '<main class="page-content"><div class="container-xl">',
      hero(),
      '<section class="section-space pt-1"><div class="row g-3">',
        ['Phòng trọ & Gác lửng','Căn hộ & Chung cư mini','Nhà nguyên căn','Ở ghép & Sleepbox','Mặt bằng & Kiot'].map(function (name, i) {
          return '<div class="col-12 col-sm-6 col-lg"><a href="/search" data-link class="category-tile"><img class="category-thumb" src="' + categoryImages[i] + '" alt="' + name + '" loading="lazy"><div class="category-copy"><div class="fw-semibold small">' + name + '</div><div class="text-80-muted small">' + ['14.230','6.840','3.120','2.450','1.110'][i] + ' tin</div></div></a></div>';
        }).join(''),
      '</div></section>',
      '<section class="section-space pt-0"><div class="d-flex justify-content-between align-items-end mb-3"><div><h2 class="h4 mb-0">Đề xuất cho bạn</h2><div class="text-80-muted small mt-1">Ưu tiên theo khu vực, giá và tiêu chí của bạn</div></div><a href="/search" data-link class="text-danger small fw-semibold">Xem tất cả →</a></div>',
      '<div class="row g-3">' + listings.map(function (item) {
        return '<div class="col-6 col-lg"><a href="/property/' + item.id + '" data-link class="text-decoration-none text-dark">' + propertyCard(item) + '</a></div>';
      }).join('') + '</div></section>',
      '<section class="section-space pt-0"><div class="row g-3"><div class="col-12 col-lg-7"><div class="card-80 p-4 h-100"><h3 class="h5">✨ 80Land Assistant</h3><p class="small text-80-muted">Tìm phòng theo nhu cầu thay vì lọc hàng chục mục.</p><div class="d-flex flex-wrap gap-2 mb-3"><span class="quick-pill">Dưới 4 triệu</span><span class="quick-pill">WC riêng</span><span class="quick-pill">Có ban công</span><span class="quick-pill">Không chung chủ</span></div><a href="/assistant" data-link class="btn btn-80-primary">Tìm giúp tôi</a></div></div><div class="col-12 col-lg-5"><div class="card-80 p-4 h-100"><h3 class="h5">🗺 Tìm quanh tôi</h3><p class="small text-80-muted">Tìm phòng bằng bản đồ hoặc vị trí thực tế.</p><a href="/map" data-link class="btn btn-80-outline">Mở bản đồ</a></div></div></div></section>',
      '<section class="section-space pt-0"><div class="d-flex justify-content-between align-items-end mb-3"><div><h2 class="h4 mb-0">Khám phá khu vực</h2><div class="text-80-muted small mt-1">Tìm theo tỉnh/thành phố</div></div><a href="/provinces" data-link class="text-danger small fw-semibold">Tất cả →</a></div>',
      '<div class="row g-3">' + provinces.map(function (province) {
        return '<div class="col-6 col-md-4 col-lg-3"><a href="/province/' + province.id + '" data-link class="card-80 p-3 h-100 d-block"><div class="category-icon mb-2">' + icon('location_city') + '</div><div class="fw-semibold small">' + province.name + '</div><div class="text-80-muted small mt-1">' + province.districts.slice(0, 3).join(' · ') + '</div><div class="text-danger small fw-semibold mt-2">' + province.count + ' tin mẫu</div></a></div>';
      }).join('') + '</div></section>',
    '</div></main>'
  ].join('');
}

function searchPage() {
  return [
    '<main class="page-content page-content-mobile"><div class="container-xl">',
      '<section class="page-hero"><h1>Phòng trọ tại TP. Hồ Chí Minh</h1><p>1.420 kết quả mẫu · Sắp xếp theo phù hợp nhất</p></section>',
      '<div class="card-80 p-3 mb-3"><div class="row g-2">',
        '<div class="col-6 col-lg-3"><div class="filter-field"><small>Khu vực</small><strong>TP.HCM</strong></div></div>',
        '<div class="col-6 col-lg-2"><div class="filter-field"><small>Giá</small><strong>3–6 triệu</strong></div></div>',
        '<div class="col-6 col-lg-2"><div class="filter-field"><small>Loại</small><strong>Phòng trọ</strong></div></div>',
        '<div class="col-6 col-lg-3"><div class="filter-field"><small>Tiện ích</small><strong>WC riêng</strong></div></div>',
        '<div class="col-12 col-lg-2"><a href="/assistant" data-link class="btn btn-80-primary w-100 h-100">✨ Gợi ý</a></div>',
      '</div></div>',
      '<div class="row g-3"><div class="col-12 col-lg-7"><div class="d-flex justify-content-between mb-2"><span class="small text-80-muted">Danh sách</span><button class="btn btn-sm btn-80-outline" type="button">↕ Sắp xếp</button></div><div class="d-grid gap-2">',
      listings.map(function (item) {
        return '<a href="/property/' + item.id + '" data-link class="text-decoration-none text-dark"><article class="result-card"><div class="thumb"><img src="' + item.image + '" alt="' + item.title.replace(/"/g, '&quot;') + '" loading="lazy"></div><div><div class="property-price">' + item.price + '/tháng</div><div class="property-title">' + item.title + '</div><div class="property-meta">📍 ' + item.location + ' · ' + item.area + '<br>✓ ' + item.features.join(' · ') + '</div></div></article></a>';
      }).join(''),
      '</div></div><div class="col-12 col-lg-5"><div class="split-map"><span class="map-pin" style="left:22%;top:28%"></span><span class="map-pin" style="left:55%;top:50%"></span><span class="map-pin" style="left:72%;top:33%"></span><span class="map-pin" style="left:44%;top:72%"></span></div></div></div>',
    '</div></main>'
  ].join('');
}

function mapPage() {
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><h1>Tìm phòng quanh bạn</h1><p>Định vị, bán kính và bộ lọc cùng lúc.</p></section><div class="split-map" style="min-height:650px"><span class="map-pin" style="left:22%;top:28%"></span><span class="map-pin" style="left:55%;top:50%"></span><span class="map-pin" style="left:72%;top:33%"></span><span class="map-pin" style="left:44%;top:72%"></span><div class="position-absolute top-0 start-0 end-0 p-3 d-flex justify-content-between"><button class="btn btn-sm btn-light border" type="button">⌖ Vị trí của tôi</button><button class="btn btn-sm btn-light border" type="button">☷ Bộ lọc</button></div><div class="position-absolute bottom-0 start-0 end-0 p-3"><div class="card-80 p-3 d-flex justify-content-between align-items-center"><div><strong>24 phòng trong 2 km</strong><div class="small text-80-muted">TP.HCM · dưới 6 triệu</div></div><a class="btn btn-sm btn-80-primary" href="/search" data-link>Xem danh sách</a></div></div></div></div></main>';
}

function detailPage(id) {
  const item = listings.find(function (entry) { return String(entry.id) === String(id); }) || listings[0];
  return [
    '<main class="page-content page-content-mobile"><div class="container-xl">',
      '<section class="page-hero"><a href="/search" data-link class="text-80-muted small">← Kết quả tìm kiếm</a></section>',
      '<div class="row g-3"><div class="col-12 col-lg-7"><div class="detail-gallery"><img src="' + item.image + '" alt="' + item.title.replace(/"/g, '&quot;') + '"></div></div>',
      '<div class="col-12 col-lg-5"><div class="detail-side"><span class="badge-verified">' + icon('verified') + ' Tin xác thực</span><h1 class="h3 mt-3">' + item.title + '</h1><div class="detail-price">' + item.price + '/tháng</div><p class="small text-80-muted mb-2">📍 ' + item.location + '</p>',
      '<div class="row g-2"><div class="col-6"><div class="spec-card"><b>' + item.area + '</b><span>Diện tích</span></div></div><div class="col-6"><div class="spec-card"><b>1 phòng</b><span>Không gian</span></div></div><div class="col-6"><div class="spec-card"><b>WC riêng</b><span>Tiện ích</span></div></div><div class="col-6"><div class="spec-card"><b>Máy lạnh</b><span>Thiết bị</span></div></div></div>',
      '<div class="d-flex gap-2 mt-3"><button type="button" class="btn btn-80-primary flex-grow-1" data-action="save">♡ Lưu tin</button><a class="btn btn-80-dark flex-grow-1" href="/messages" data-link>💬 Nhắn chủ</a></div></div></div>',
      '<div class="col-12"><div class="card-80 p-3"><h2 class="h5">Mô tả phòng</h2><p class="small text-80-muted mb-0">Phòng sạch, thoáng, đầy đủ nội thất cơ bản. Khu vực an ninh, thuận tiện đi các quận trung tâm. Có chỗ để xe và giờ giấc tự do.</p></div></div>',
      '<div class="col-12"><div class="card-80 p-3"><h2 class="h5">Tiện ích</h2><div class="d-flex gap-2 flex-wrap">' + item.features.map(function (feature) { return '<span class="badge rounded-pill bg-light text-dark border">' + feature + '</span>'; }).join('') + '</div></div></div>',
      '<div class="col-12 col-lg-5"><div class="card-80 p-3"><div class="d-flex align-items-center gap-2"><div class="category-icon">' + icon('person') + '</div><div><strong>Nguyễn Minh</strong><div class="small text-80-muted">Phản hồi nhanh · 96% đánh giá tốt</div></div></div><div class="d-flex gap-2 mt-3"><button class="btn btn-outline-secondary flex-grow-1" type="button">☎ Gọi</button><a href="/messages" data-link class="btn btn-80-dark flex-grow-1">💬 Nhắn tin</a></div></div></div>',
      '<div class="col-12 col-lg-7"><div class="card-80 p-3"><h2 class="h5">Vị trí</h2><div class="split-map" style="min-height:280px"><span class="map-pin" style="left:45%;top:43%"></span></div><a href="/map" data-link class="btn btn-outline-secondary mt-2 w-100">📍 Mở bản đồ</a></div></div>',
    '</div></div></main>'
  ].join('');
}

function simpleListPage(title, subtitle, rows, actions) {
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><h1>' + title + '</h1><p>' + subtitle + '</p></section><div class="d-grid gap-2">' +
    rows.map(function (row) {
      return '<div class="card-80 p-3"><strong class="small">' + row.title + '</strong><div class="text-80-muted small mt-1">' + row.body + '</div>' + (row.link ? '<a href="' + row.link + '" data-link class="btn btn-sm btn-outline-secondary mt-2">Xem</a>' : '') + '</div>';
    }).join('') +
    '</div>' + (actions || '') + '</div></main>';
}

function savedPage() {
  const rows = listings.slice(0, 3).map(function (item) {
    return { title: item.title, body: item.price + '/tháng · ' + item.location + ' · ' + item.area, link: '/property/' + item.id };
  });
  return simpleListPage('Tin đã lưu', 'Những phòng bạn muốn so sánh hoặc liên hệ sau.', rows, '<a href="/search" data-link class="btn btn-80-primary mt-3">Tìm thêm phòng</a>');
}

function messagesPage() {
  return [
    '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><h1>Tin nhắn</h1><p>6 cuộc trò chuyện</p></section>',
    '<div class="row g-3"><div class="col-12 col-lg-5"><div class="card-80 p-2">',
    chats.map(function (chat, index) {
      return '<button type="button" class="w-100 text-start border-0 bg-white p-3 rounded-3 ' + (index === 0 ? 'bg-light' : '') + '" data-chat="' + chat.id + '"><div class="d-flex justify-content-between"><strong class="small">' + chat.name + ' · ' + chat.property + '</strong><span class="text-80-muted" style="font-size:10px">' + chat.time + '</span></div><div class="text-80-muted" style="font-size:10px">' + chat.last + '</div></button>';
    }).join(''),
    '</div></div><div class="col-12 col-lg-7"><div class="card-80 p-3"><h2 class="h5">Chủ trọ Minh</h2><div class="p-3 bg-80-bg rounded-3 mt-2" id="chatBox" style="min-height:300px"><div class="bg-white border rounded-3 p-2 small mb-2">Phòng còn trống nhé bạn. Bạn muốn xem lúc nào?</div><div class="bg-primary text-white rounded-3 p-2 small mb-2 ms-auto" style="max-width:80%">Mình xem 18:30 hôm nay được không?</div></div><form class="d-flex gap-2 mt-2" id="chatForm"><input class="form-control" placeholder="Nhập tin nhắn..."><button class="btn btn-80-dark">Gửi</button></form></div></div></div></div></main>'
  ].join('');
}

function notificationsPage() {
  return simpleListPage('Thông báo', '3 thông báo chưa đọc', notifications.map(function (item) {
    return {title:item.title, body:item.body};
  }));
}

function profilePage() {
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><h1>Tài khoản</h1><p>Quản lý hồ sơ, tin lưu, thông báo và cài đặt.</p></section><div class="card-80 p-4"><div class="d-flex align-items-center gap-3"><div class="category-icon" style="width:54px;height:54px">' + icon('person') + '</div><div><h2 class="h5 mb-1">Quang Tuấn</h2><div class="text-80-muted small">Thành viên từ 2026 · TP.HCM</div></div></div><div class="row g-2 mt-3"><div class="col-4"><div class="spec-card"><b>12</b><span>Tin lưu</span></div></div><div class="col-4"><div class="spec-card"><b>38</b><span>Lượt xem</span></div></div><div class="col-4"><div class="spec-card"><b>6</b><span>Chats</span></div></div></div><div class="list-group list-group-flush mt-3"><a class="list-group-item list-group-item-action" href="/saved" data-link>Tin đã lưu →</a><a class="list-group-item list-group-item-action" href="/messages" data-link>Tin nhắn →</a><a class="list-group-item list-group-item-action" href="/notifications" data-link>Thông báo →</a><a class="list-group-item list-group-item-action" href="/assistant" data-link>80Land Assistant →</a></div></div></div></main>';
}

function assistantPage() {
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><h1>80Land Assistant</h1><p>Tìm phòng theo nhu cầu thay vì lọc hàng chục mục.</p></section><div class="card-80 p-4"><label class="small text-80-muted">Bạn muốn tìm phòng ở đâu?</label><input class="form-control mt-1" value="TP. Hồ Chí Minh"><div class="small text-80-muted mt-3">Ưu tiên của bạn</div><div class="d-flex flex-wrap gap-2 mt-2"><button class="quick-pill" type="button">Dưới 4 triệu</button><button class="quick-pill" type="button">WC riêng</button><button class="quick-pill" type="button">Có ban công</button><button class="quick-pill" type="button">Pet-friendly</button><button class="quick-pill" type="button">Không chung chủ</button></div><a href="/search" data-link class="btn btn-80-primary mt-3">✨ Gợi ý phòng phù hợp</a></div></div></main>';
}

function provincesPage() {
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><h1>Khám phá khu vực</h1><p>Chọn tỉnh/thành để mở luồng tìm phòng.</p></section><div class="row g-3">' +
    provinces.map(function (province) {
      return '<div class="col-6 col-md-4 col-lg-3"><a href="/province/' + province.id + '" data-link class="card-80 p-3 d-block h-100"><div class="category-icon mb-2">' + icon('location_city') + '</div><div class="fw-semibold small">' + province.name + '</div><div class="text-80-muted" style="font-size:10px;margin-top:5px">' + province.districts.slice(0, 3).join(' · ') + '</div><div class="text-danger fw-semibold small mt-2">' + province.count + ' tin</div></a></div>';
    }).join('') +
    '</div></div></main>';
}

function provincePage(id) {
  const province = provinces.find(function (item) { return item.id === id; }) || provinces[0];
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><a href="/provinces" data-link class="text-80-muted small">← Khu vực</a><h1 class="mt-2">Tìm phòng tại ' + province.name + '</h1><p>' + province.count + ' tin mẫu · ' + province.districts.slice(0,3).join(' · ') + '</p></section><div class="card-80 p-4 mb-3"><h2 class="h5">Khu vực nổi bật</h2><div class="d-flex flex-wrap gap-2">' + province.districts.map(function (district) { return '<span class="quick-pill">' + district + '</span>'; }).join('') + '</div><a href="/search" data-link class="btn btn-80-primary mt-3">Xem phòng</a></div><div class="row g-3">' + listings.slice(0,2).map(function (item) { return '<div class="col-6"><a href="/property/' + item.id + '" data-link class="text-dark text-decoration-none">' + propertyCard(item) + '</a></div>'; }).join('') + '</div><div class="card-80 p-3 mt-3"><h2 class="h5">Tìm quanh khu vực</h2><div class="split-map mt-2" style="min-height:260px"><span class="map-pin" style="left:45%;top:43%"></span></div><a href="/map" data-link class="btn btn-outline-secondary w-100 mt-2">Mở bản đồ</a></div></div></main>';
}

function landlordPage() {
  const stats = [['18','Tin đang hiển thị'],['2.4K','Lượt xem'],['86','Khách quan tâm'],['12,6tr','Doanh thu']];
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><h1>Chủ trọ</h1><p>Quản lý tin đăng và khách quan tâm.</p></section><div class="row g-2">' +
    stats.map(function (s) { return '<div class="col-6 col-lg-3"><div class="card-80 p-3"><div class="detail-price" style="font-size:22px">' + s[0] + '</div><div class="text-80-muted small">' + s[1] + '</div></div></div>'; }).join('') +
    '</div><div class="card-80 p-3 mt-3"><div class="d-flex justify-content-between mb-2"><h2 class="h5 mb-0">Quản lý tin</h2><button class="btn btn-sm btn-80-primary" type="button">＋ Đăng tin</button></div><div class="table-responsive"><table class="table align-middle small"><thead><tr><th>Tin</th><th>Trạng thái</th><th>Lượt xem</th></tr></thead><tbody><tr><td>Studio Bình Thạnh</td><td class="text-success">Đang hiển thị</td><td>428</td></tr><tr><td>Phòng gác Thủ Đức</td><td class="text-success">Đang hiển thị</td><td>315</td></tr><tr><td>Căn hộ Quận 7</td><td class="text-warning">Chờ duyệt</td><td>0</td></tr></tbody></table></div></div></div></main>';
}

function adminPage() {
  const stats = [['18.2K','Người dùng'],['25.4K','Tin đăng'],['142','Chờ duyệt'],['23','Báo cáo']];
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><h1>Admin</h1><p>Kiểm duyệt, người dùng, báo cáo và audit.</p></section><div class="row g-2">' +
    stats.map(function (s) { return '<div class="col-6 col-lg-3"><div class="card-80 p-3"><div class="detail-price" style="font-size:22px">' + s[0] + '</div><div class="text-80-muted small">' + s[1] + '</div></div></div>'; }).join('') +
    '</div><div class="card-80 p-3 mt-3"><h2 class="h5">Hàng chờ xử lý</h2><div class="list-group list-group-flush"><div class="list-group-item"><strong>Tin #80L-1420</strong><div class="small text-warning">Chờ duyệt · Kiểm tra</div></div><div class="list-group-item"><strong>Tài khoản #9921</strong><div class="small text-success">Bình thường</div></div><div class="list-group-item"><strong>Báo cáo #183</strong><div class="small text-danger">Cần xử lý</div></div></div></div></div></main>';
}

function render() {
  const path = (location.pathname || '/').replace(/\/+/g, '/') || '/';
  let content = homePage();
  if (path === '/search') content = searchPage();
  else if (path === '/map') content = mapPage();
  else if (path.indexOf('/property/') === 0) content = detailPage(path.split('/')[2]);
  else if (path === '/saved') content = savedPage();
  else if (path === '/messages') content = messagesPage();
  else if (path === '/notifications') content = notificationsPage();
  else if (path === '/profile') content = profilePage();
  else if (path === '/assistant') content = assistantPage();
  else if (path === '/provinces') content = provincesPage();
  else if (path.indexOf('/province/') === 0) content = provincePage(path.split('/')[2]);
  else if (path === '/landlord') content = landlordPage();
  else if (path === '/admin') content = adminPage();
  app.innerHTML = layout(content);
  bind();
}

function bind() {
  document.querySelectorAll('[data-link]').forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      navigate(element.getAttribute('href'));
    });
  });
  document.querySelectorAll('[data-go]').forEach(function (element) {
    element.addEventListener('click', function () {
      navigate(element.dataset.go);
    });
  });
  document.querySelectorAll('[data-save]').forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      localStorage.setItem('80land:lastSaved', element.dataset.save);
      element.innerHTML = icon('favorite');
    });
  });
  document.querySelectorAll('[data-notification]').forEach(function (element) {
    element.addEventListener('click', function () {
      element.classList.remove('border-danger');
    });
  });
  const form = document.querySelector('#chatForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const input = form.querySelector('input');
      const value = input.value.trim();
      if (!value) return;
      const bubble = document.createElement('div');
      bubble.className = 'bg-primary text-white rounded-3 p-2 small mb-2 ms-auto';
      bubble.style.maxWidth = '80%';
      bubble.textContent = value;
      document.querySelector('#chatBox').appendChild(bubble);
      input.value = '';
    });
  }
  initHero();
}

function initHero() {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  if (!slides.length) return;
  let index = 0;
  window.setInterval(function () {
    slides.forEach(function (slide, current) {
      slide.classList.toggle('active', current === index);
    });
    index = (index + 1) % slides.length;
  }, 5200);
}

window.addEventListener('popstate', render);
render();
