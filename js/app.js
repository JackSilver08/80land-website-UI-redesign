
import { navigate } from './router.js';
import { provinces, listings, chats, notifications } from './data.js';

const app = document.querySelector('#app');

function icon(name) {
  return '<span class="material-symbols-outlined align-middle" aria-hidden="true">' + name + '</span>';
}

function layout(content) {
  return header() + content + mobileNav();
}

function header() {
  return [
    '<header class="site-header"><div class="container-xl"><div class="inner d-flex align-items-center justify-content-between gap-3 py-2">',
      '<a class="brand flex-shrink-0" href="/" data-link><span class="brand-mark">',
        icon('home'),
      '</span><span class="brand-copy"><strong>80Land</strong><span>Tìm phòng nhanh</span></span></a>',
      '<div class="header-actions d-flex align-items-center gap-2">',
        '<a href="/messages" data-link class="header-icon" data-tooltip="Tin nhắn">' + icon('chat_bubble') + '</a>',
        '<a href="/landlord" data-link class="btn btn-sm btn-80-primary ms-1 rounded-80 d-inline-flex align-items-center gap-1 px-3">' + icon('add') + ' Đăng tin</a>',
        '<div class="user-menu">',
          '<button type="button" class="user-menu-trigger" id="userMenuTrigger" aria-expanded="false" aria-haspopup="true">',
            '<span class="user-avatar" aria-hidden="true">QT</span>',
            '<span class="user-name">Quang Tuấn</span>',
            '<span class="user-chevron">' + icon('expand_more') + '</span>',
          '</button>',
          '<div class="user-dropdown" id="userDropdown" role="menu" aria-hidden="true">',
            '<a href="/saved" data-link class="user-dropdown-item" role="menuitem">' + icon('favorite') + '<span>Tin đã lưu</span><span class="menu-count">3</span></a>',
            '<a href="/notifications" data-link class="user-dropdown-item" role="menuitem">' + icon('notifications') + '<span>Thông báo</span><span class="menu-count">3</span></a>',
            '<a href="/profile" data-link class="user-dropdown-item" role="menuitem">' + icon('person') + '<span>Trang cá nhân</span></a>',
            '<div class="user-dropdown-divider"></div>',
            '<button type="button" class="user-dropdown-item user-logout" id="logoutBtn" role="menuitem">' + icon('logout') + '<span>Đăng xuất</span></button>',
          '</div>',
        '</div>',
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
              '<a href="/map" data-link class="btn btn-light border">🗺 Tìm quanh tôi</a>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',
      '<div class="hero-orbit" aria-hidden="true"></div>',
      '<div class="hero-search">',
        '<div class="hero-search-row">',
          '<label class="hero-search-input"><span>' + icon('search') + '</span><input id="heroSearchInput" name="q" type="search" inputmode="search" autocomplete="off" placeholder="Tìm phòng, khu vực, quận huyện..." aria-label="Tìm phòng"></label>',
          '<a href="/search" data-link class="hero-filter-btn" data-tooltip="Bộ lọc">' + icon('tune') + '<span class="filter-label">Bộ lọc</span></a>',
        '</div>',
      '</div>',
    '</section>'
  ].join('');
}

function homePage() {
  return [
    '<main class="page-content"><div class="container-xl">',
      hero(),
      '<section class="section-space pt-1 home-categories-section"><div class="home-category-grid">',
        [
          ['Phòng trọ','14.230','bi-house-door-fill'],
          ['Chung cư','6.840','bi-buildings-fill'],
          ['Nhà nguyên căn','3.120','bi-house-fill'],
          ['Căn hộ dịch vụ','2.980','bi-building-fill'],
          ['Mặt bằng kinh doanh','1.110','bi-shop'],
          ['Pass phòng','860','bi-arrow-left-right'],
          ['Ở ghép','2.450','bi-people-fill'],
          ['Tất cả','32.540','bi-grid-fill']
        ].map(function (item) {
          return '<a href="/search" data-link class="home-category-card">' +
            '<span class="home-category-icon"><i class="bi ' + item[2] + '" aria-hidden="true"></i></span>' +
            '<span class="home-category-copy"><strong>' + item[0] + '</strong><small>' + item[1] + ' tin</small></span>' +
          '</a>';
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
    '<main class="page-content page-content-mobile search-page"><div class="container-xl">',
      '<section class="search-toolbar">',
        '<div class="search-toolbar-main">',
          '<a href="/" data-link class="search-back">' + icon('arrow_back') + '</a>',
          '<div class="search-toolbar-input"><span>' + icon('search') + '</span><input id="resultSearchInput" value="TP. Hồ Chí Minh" aria-label="Tìm kiếm"></div>',
          '<button type="button" class="search-toolbar-location" data-location><span>' + icon('my_location') + '</span><span>Quanh tôi</span></button>',
        '</div>',
        '<div class="search-toolbar-actions">',
          '<button type="button" class="filter-chip active" data-filter-toggle><span>' + icon('tune') + '</span> Bộ lọc</button>',
          '<button type="button" class="filter-chip">Giá</button>',
          '<button type="button" class="filter-chip">Loại phòng</button>',
          '<button type="button" class="filter-chip">Tiện ích</button>',
          '<button type="button" class="filter-chip filter-chip-sort">Phù hợp nhất ' + icon('expand_more') + '</button>',
        '</div>',
      '</section>',
      '<div class="search-status-row"><div><strong>1.420 phòng</strong><span> tại TP. Hồ Chí Minh</span></div><a href="/assistant" data-link class="recommend-link">' + icon('auto_awesome') + ' Gợi ý theo nhu cầu</a></div>',
      '<div class="search-layout">',
        '<section class="search-results-column">',
          '<div class="search-result-grid">',
            listings.map(function (item) {
              return '<a href="/property/' + item.id + '" data-link class="text-decoration-none text-dark"><article class="result-card result-card-modern">' +
                '<div class="thumb"><img src="' + item.image + '" alt="' + item.title.replace(/"/g, '&quot;') + '" loading="lazy"><button class="result-save" type="button" data-save="' + item.id + '">' + icon('favorite_border') + '</button>' +
                (item.verified ? '<span class="result-verified">' + icon('verified') + ' Xác thực</span>' : '') + '</div>' +
                '<div class="result-card-body"><div class="property-price">' + item.price + '/tháng</div><div class="property-title">' + item.title + '</div>' +
                '<div class="result-meta-row"><span>' + icon('location_on') + ' ' + item.location + '</span><span>' + icon('straighten') + ' ' + item.area + '</span></div>' +
                '<div class="result-feature-row">' + item.features.slice(0, 2).map(function (feature) { return '<span>' + feature + '</span>'; }).join('') + '</div></div>' +
              '</article></a>';
            }).join(''),
          '</div>',
        '</section>',
        '<aside class="search-map-panel">',
          '<div class="map-panel-head"><div><strong>Bản đồ khu vực</strong><small>Hiển thị phòng đang có trong khu vực tìm kiếm</small></div><button class="map-locate-btn" type="button" data-location>' + icon('my_location') + '</button></div>',
          '<div class="split-map search-map">',
            '<span class="map-neighborhood-label label-a">Bình Thạnh</span><span class="map-neighborhood-label label-b">Thủ Đức</span><span class="map-neighborhood-label label-c">Quận 7</span>',
            '<button type="button" class="map-pin map-pin-button" style="left:22%;top:28%" data-map-item="1"><span class="map-pin-price">4,2tr</span></button>',
            '<button type="button" class="map-pin map-pin-button" style="left:55%;top:50%" data-map-item="2"><span class="map-pin-price">3,8tr</span></button>',
            '<button type="button" class="map-pin map-pin-button" style="left:72%;top:33%" data-map-item="3"><span class="map-pin-price">5,0tr</span></button>',
            '<button type="button" class="map-pin map-pin-button" style="left:44%;top:72%" data-map-item="4"><span class="map-pin-price">3,2tr</span></button>',
            '<div class="map-preview-card" id="mapPreviewCard"><div><span class="badge-verified">' + icon('verified') + ' Chính chủ</span><strong>Chọn một điểm trên bản đồ</strong><span>Giá và thông tin phòng sẽ hiện tại đây.</span></div></div>',
          '</div>',
        '</aside>',
      '</div>',
      '<div class="filter-sheet-backdrop" id="filterBackdrop"></div>',
      '<aside class="filter-sheet" id="searchFilterSheet" aria-hidden="true">',
        '<div class="filter-sheet-grabber"></div>',
        '<div class="filter-sheet-head"><div><strong>Bộ lọc tìm phòng</strong><small>Chọn tiêu chí bạn thực sự cần</small></div><button type="button" class="icon-button" data-filter-close>' + icon('close') + '</button></div>',
        '<div class="filter-sheet-body">',
          '<div class="filter-group"><span>Khoảng giá</span><div class="filter-option-row"><button class="filter-option active">Dưới 4 triệu</button><button class="filter-option">4–6 triệu</button><button class="filter-option">6–10 triệu</button></div></div>',
          '<div class="filter-group"><span>Loại hình</span><div class="filter-option-row"><button class="filter-option active">Phòng trọ</button><button class="filter-option">Chung cư</button><button class="filter-option">Nhà nguyên căn</button></div></div>',
          '<div class="filter-group"><span>Ưu tiên</span><div class="filter-check-grid"><label><input type="checkbox" checked> WC riêng</label><label><input type="checkbox" checked> Có máy lạnh</label><label><input type="checkbox"> Ban công</label><label><input type="checkbox"> Không chung chủ</label></div></div>',
        '</div>',
        '<div class="filter-sheet-foot"><button type="button" class="btn btn-80-outline" data-filter-close>Đặt lại</button><button type="button" class="btn btn-80-primary flex-grow-1" data-filter-close>Hiển thị 1.420 phòng</button></div>',
      '</aside>',
    '</div></main>'
  ].join('');
}

function mapPage() {
  return [
    '<main class="page-content page-content-mobile"><div class="container-xl">',
      '<section class="page-hero map-page-hero"><div><a href="/search" data-link class="text-80-muted small">' + icon('arrow_back') + ' Kết quả</a><h1>Tìm phòng quanh bạn</h1><p>Chọn bán kính hoặc dùng vị trí hiện tại để khám phá phòng gần nhất.</p></div><div class="map-radius-picker"><span>Bán kính</span><button class="active">1 km</button><button>2 km</button><button>5 km</button></div></section>',
      '<div class="map-experience">',
        '<div class="split-map full-map">',
          '<span class="map-neighborhood-label label-a">Bình Thạnh</span><span class="map-neighborhood-label label-b">Thủ Đức</span><span class="map-neighborhood-label label-c">Quận 7</span>',
          '<button type="button" class="map-pin map-pin-button" style="left:22%;top:28%" data-map-item="1"><span class="map-pin-price">4,2tr</span></button>',
          '<button type="button" class="map-pin map-pin-button" style="left:55%;top:50%" data-map-item="2"><span class="map-pin-price">3,8tr</span></button>',
          '<button type="button" class="map-pin map-pin-button" style="left:72%;top:33%" data-map-item="3"><span class="map-pin-price">5,0tr</span></button>',
          '<button type="button" class="map-pin map-pin-button" style="left:44%;top:72%" data-map-item="4"><span class="map-pin-price">3,2tr</span></button>',
          '<button type="button" class="map-control map-control-locate" data-location>' + icon('my_location') + '<span>Vị trí của tôi</span></button>',
          '<button type="button" class="map-control map-control-filter" data-filter-toggle>' + icon('tune') + '<span>Bộ lọc</span></button>',
          '<div class="map-floating-summary"><strong>24 phòng trong 2 km</strong><span>TP.HCM · dưới 6 triệu · WC riêng</span><a href="/search" data-link>Danh sách ' + icon('arrow_forward') + '</a></div>',
        '</div>',
      '</div>',
      '<div class="map-mobile-results"><div class="section-label-row"><strong>Phòng gần bạn</strong><a href="/search" data-link>Xem danh sách</a></div><div class="horizontal-property-list">' +
        listings.slice(0, 3).map(function (item) { return '<a href="/property/' + item.id + '" data-link>' + propertyCard(item) + '</a>'; }).join('') +
      '</div></div>',
      '<div class="filter-sheet-backdrop" id="filterBackdropMap"></div>',
      '<aside class="filter-sheet" id="mapFilterSheet" aria-hidden="true">',
        '<div class="filter-sheet-grabber"></div>',
        '<div class="filter-sheet-head"><div><strong>Bộ lọc bản đồ</strong><small>Thu hẹp khu vực theo nhu cầu</small></div><button type="button" class="icon-button" data-filter-close>' + icon('close') + '</button></div>',
        '<div class="filter-sheet-body"><div class="filter-group"><span>Khu vực</span><div class="filter-option-row"><button class="filter-option active">Quanh tôi</button><button class="filter-option">TP.HCM</button><button class="filter-option">Đồng Nai</button></div></div><div class="filter-group"><span>Khoảng giá</span><div class="filter-option-row"><button class="filter-option active">Dưới 6 triệu</button><button class="filter-option">6–10 triệu</button></div></div></div>',
        '<div class="filter-sheet-foot"><button type="button" class="btn btn-80-outline" data-filter-close>Đặt lại</button><button type="button" class="btn btn-80-primary flex-grow-1" data-filter-close>Áp dụng</button></div>',
      '</aside>',
    '</div></main>'
  ].join('');
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
  return [
    '<main class="page-content page-content-mobile"><div class="container-xl">',
      '<section class="page-hero"><span class="assistant-kicker">' + icon('auto_awesome') + ' 80LAND SMART MATCH</span><h1>Tìm phòng theo nhu cầu của bạn</h1><p>Chọn vài tiêu chí quan trọng. 80Land sẽ ưu tiên các tin phù hợp ở những lần tìm tiếp theo.</p></section>',
      '<div class="assistant-layout">',
        '<section class="assistant-form card-80">',
          '<div class="assistant-step"><span>01</span><div><strong>Khu vực bạn muốn ở?</strong><small>Chọn nơi bạn thường học tập, làm việc hoặc sinh hoạt.</small></div></div>',
          '<div class="assistant-choice-grid"><button class="assistant-choice active">TP. Hồ Chí Minh</button><button class="assistant-choice">Đồng Nai</button><button class="assistant-choice">Bình Dương</button><button class="assistant-choice">Đà Nẵng</button></div>',
          '<div class="assistant-step"><span>02</span><div><strong>Ngân sách mỗi tháng?</strong><small>Khoảng giá giúp gợi ý đúng nhu cầu hơn.</small></div></div>',
          '<div class="assistant-choice-grid"><button class="assistant-choice active">Dưới 4 triệu</button><button class="assistant-choice">4–6 triệu</button><button class="assistant-choice">6–10 triệu</button><button class="assistant-choice">Trên 10 triệu</button></div>',
          '<div class="assistant-step"><span>03</span><div><strong>Tiện ích ưu tiên</strong><small>Bạn có thể chọn nhiều.</small></div></div>',
          '<div class="assistant-choice-grid assistant-multi"><button class="assistant-choice active">WC riêng</button><button class="assistant-choice active">Máy lạnh</button><button class="assistant-choice">Ban công</button><button class="assistant-choice">Không chung chủ</button><button class="assistant-choice">Nuôi thú cưng</button><button class="assistant-choice">Có chỗ để xe</button></div>',
          '<div class="assistant-actions"><button type="button" class="btn btn-80-primary" id="savePreferences">' + icon('auto_awesome') + ' Xem phòng phù hợp</button><a href="/search" data-link class="btn btn-80-outline">Bỏ qua</a></div>',
        '</section>',
        '<aside class="assistant-preview card-80"><span class="assistant-preview-label">Xem trước</span><strong>Gợi ý của bạn sẽ trông như thế này</strong><div class="match-card"><div class="match-score">95% phù hợp</div><div class="match-title">Studio full nội thất, cửa sổ lớn</div><div class="property-price">4,2 triệu/tháng</div><div class="match-reasons"><span>✓ Đúng ngân sách</span><span>✓ WC riêng</span><span>✓ Máy lạnh</span><span>✓ Bình Thạnh</span></div></div><div class="small text-80-muted mt-3">Bạn có thể thay đổi tiêu chí bất cứ lúc nào trong trang cá nhân.</div></aside>',
      '</div>',
    '</div></main>'
  ].join('');
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
  const stats = [['18','Tin đang hiển thị','visibility'],['2.4K','Lượt xem','visibility'],['86','Khách quan tâm','favorite'],['12,6tr','Doanh thu','payments']];
  return [
    '<main class="page-content page-content-mobile"><div class="container-xl">',
      '<section class="page-hero landlord-hero"><div><span class="assistant-kicker">' + icon('storefront') + ' LANDLORD</span><h1>Quản lý căn phòng của bạn</h1><p>Đăng tin, theo dõi lượt xem và trả lời người tìm phòng từ một nơi.</p></div><a href="/landlord/new" data-link class="btn btn-80-primary">' + icon('add') + ' Tạo tin mới</a></section>',
      '<div class="landlord-stat-grid">' + stats.map(function (s) { return '<div class="card-80 landlord-stat-card"><span class="landlord-stat-icon">' + icon(s[2]) + '</span><div><strong>' + s[0] + '</strong><small>' + s[1] + '</small></div></div>'; }).join('') + '</div>',
      '<section class="landlord-workspace">',
        '<div class="card-80 landlord-list-card"><div class="landlord-section-head"><div><h2>Quản lý tin đăng</h2><p>Kiểm tra trạng thái và thao tác nhanh.</p></div><a href="/landlord/new" data-link class="btn btn-sm btn-80-outline">＋ Đăng tin</a></div>',
        '<div class="landlord-list">',
          '<article class="landlord-list-row"><div class="landlord-thumb" style="background-image:url(' + JSON.stringify(listings[0].image) + ')"></div><div class="landlord-row-copy"><strong>Studio Bình Thạnh</strong><span>4,2 triệu/tháng · 28 m²</span><small>428 lượt xem · 16 khách quan tâm</small></div><span class="status-pill success">Đang hiển thị</span><button class="icon-button">' + icon('more_horiz') + '</button></article>',
          '<article class="landlord-list-row"><div class="landlord-thumb" style="background-image:url(' + JSON.stringify(listings[1].image) + ')"></div><div class="landlord-row-copy"><strong>Phòng gác Thủ Đức</strong><span>3,8 triệu/tháng · 24 m²</span><small>315 lượt xem · 9 khách quan tâm</small></div><span class="status-pill success">Đang hiển thị</span><button class="icon-button">' + icon('more_horiz') + '</button></article>',
          '<article class="landlord-list-row"><div class="landlord-thumb" style="background-image:url(' + JSON.stringify(listings[2].image) + ')"></div><div class="landlord-row-copy"><strong>Căn hộ Quận 7</strong><span>5,0 triệu/tháng · 35 m²</span><small>Chờ hệ thống kiểm duyệt</small></div><span class="status-pill warning">Chờ duyệt</span><button class="icon-button">' + icon('more_horiz') + '</button></article>',
        '</div></div>',
        '<aside class="card-80 landlord-side-card"><span class="assistant-kicker">' + icon('tips_and_updates') + ' Gợi ý</span><h2>Tăng tỷ lệ người liên hệ</h2><p>Ảnh sáng, tiêu đề rõ ràng và thông tin đầy đủ giúp tin đăng dễ được chú ý hơn.</p><div class="landlord-checklist"><span>✓ Có ít nhất 5 ảnh</span><span>✓ Đã xác minh số điện thoại</span><span>✓ Có vị trí bản đồ</span><span>+ Thêm video phòng</span></div><a href="/landlord/new" data-link class="btn btn-80-primary w-100">Hoàn thiện tin</a></aside>',
      '</section>',
    '</div></main>'
  ].join('');
}

function landlordCreatePage() {
  return [
    '<main class="page-content page-content-mobile"><div class="container-xl">',
      '<section class="page-hero"><a href="/landlord" data-link class="text-80-muted small">' + icon('arrow_back') + ' Quản lý tin</a><h1 class="mt-2">Tạo tin cho thuê</h1><p>Điền thông tin theo từng bước để người tìm phòng dễ hiểu và dễ liên hệ.</p></section>',
      '<div class="listing-create-layout">',
        '<section class="card-80 listing-stepper">',
          '<div class="listing-step active"><span>1</span><div><strong>Thông tin cơ bản</strong><small>Loại hình, tiêu đề, giá</small></div></div>',
          '<div class="listing-step"><span>2</span><div><strong>Hình ảnh & tiện ích</strong><small>Ảnh phòng, tiện nghi</small></div></div>',
          '<div class="listing-step"><span>3</span><div><strong>Vị trí</strong><small>Địa chỉ và bản đồ</small></div></div>',
          '<div class="listing-step"><span>4</span><div><strong>Xem trước</strong><small>Kiểm tra trước khi đăng</small></div></div>',
          '<div class="listing-progress"><span>25% hoàn thành</span><div><i style="width:25%"></i></div></div>',
        '</section>',
        '<section class="card-80 listing-form-card"><div class="listing-form-head"><div><span class="assistant-kicker">Bước 1</span><h2>Thông tin cơ bản</h2><p>Những trường người tìm phòng quan tâm đầu tiên.</p></div><span class="required-note">* Bắt buộc</span></div>',
          '<div class="listing-form-grid">',
            '<label class="form-field"><span>Loại hình *</span><select><option>Phòng trọ</option><option>Chung cư</option><option>Nhà nguyên căn</option><option>Căn hộ dịch vụ</option></select></label>',
            '<label class="form-field"><span>Giá thuê / tháng *</span><input value="4.200.000"></label>',
            '<label class="form-field full"><span>Tiêu đề tin *</span><input value="Studio full nội thất, cửa sổ lớn"></label>',
            '<label class="form-field"><span>Diện tích *</span><input value="28"></label>',
            '<label class="form-field"><span>Hình thức</span><select><option>Cho thuê dài hạn</option><option>Ngắn hạn</option></select></label>',
          '</div>',
          '<div class="listing-photo-drop"><div class="listing-photo-icon">' + icon('add_photo_alternate') + '</div><div><strong>Thêm ảnh phòng</strong><p>Tối thiểu 3 ảnh. Kéo thả hoặc chọn từ thiết bị.</p></div><button class="btn btn-80-outline" type="button">Chọn ảnh</button></div>',
          '<div class="listing-form-actions"><a href="/landlord" data-link class="btn btn-80-outline">Lưu nháp</a><button class="btn btn-80-primary" type="button" id="nextListingStep">Tiếp tục ' + icon('arrow_forward') + '</button></div>',
        '</section>',
        '<aside class="card-80 listing-preview-card"><span class="assistant-kicker">Xem trước tin</span><div class="preview-media" style="background-image:url(' + JSON.stringify(listings[0].image) + ')"><span class="status-pill success">Xác thực</span></div><div class="p-3"><div class="property-price">4,2 triệu/tháng</div><strong>Studio full nội thất, cửa sổ lớn</strong><div class="property-meta">📍 Bình Thạnh, TP.HCM · 28 m²</div><div class="d-flex flex-wrap gap-1 mt-2"><span class="quick-pill">WC riêng</span><span class="quick-pill">Máy lạnh</span><span class="quick-pill">Ban công</span></div></div></aside>',
      '</div>',
    '</div></main>'
  ].join('');
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
  else if (path === '/landlord/new') content = landlordCreatePage();
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
  const userMenu = document.querySelector('.user-menu');
  const userMenuTrigger = document.querySelector('#userMenuTrigger');
  const userDropdown = document.querySelector('#userDropdown');
  if (userMenu && userMenuTrigger && userDropdown) {
    const setUserMenuOpen = function (open) {
      userMenu.classList.toggle('is-open', open);
      userMenuTrigger.setAttribute('aria-expanded', String(open));
      userDropdown.setAttribute('aria-hidden', String(!open));
    };
    userMenuTrigger.addEventListener('click', function (event) {
      event.stopPropagation();
      setUserMenuOpen(!userMenu.classList.contains('is-open'));
    });
    userDropdown.addEventListener('click', function (event) {
      event.stopPropagation();
    });
    document.addEventListener('click', function () {
      if (userMenu.classList.contains('is-open')) setUserMenuOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setUserMenuOpen(false);
    });
    const logoutBtn = document.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('80land:lastSaved');
        setUserMenuOpen(false);
        alert('Bạn đã đăng xuất khỏi 80Land.');
      });
    }
  }
  const heroSearchInput = document.querySelector('#heroSearchInput');
  if (heroSearchInput) {
    heroSearchInput.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      const q = heroSearchInput.value.trim();
      navigate(q ? '/search?q=' + encodeURIComponent(q) : '/search');
    });
  }
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
  document.querySelectorAll('[data-filter-toggle]').forEach(function (element) {
    element.addEventListener('click', function () {
      const sheet = document.querySelector('#searchFilterSheet') || document.querySelector('#mapFilterSheet');
      const backdrop = document.querySelector('#filterBackdrop') || document.querySelector('#filterBackdropMap');
      if (!sheet) return;
      sheet.classList.add('is-open');
      sheet.setAttribute('aria-hidden', 'false');
      if (backdrop) backdrop.classList.add('is-open');
    });
  });
  document.querySelectorAll('[data-filter-close]').forEach(function (element) {
    element.addEventListener('click', function () {
      const sheet = element.closest('.filter-sheet');
      const backdrop = document.querySelector('#filterBackdrop.is-open') || document.querySelector('#filterBackdropMap.is-open');
      if (sheet) {
        sheet.classList.remove('is-open');
        sheet.setAttribute('aria-hidden', 'true');
      }
      if (backdrop) backdrop.classList.remove('is-open');
    });
  });
  document.querySelectorAll('.filter-sheet-backdrop').forEach(function (backdrop) {
    backdrop.addEventListener('click', function () {
      const sheet = document.querySelector('.filter-sheet.is-open');
      if (sheet) {
        sheet.classList.remove('is-open');
        sheet.setAttribute('aria-hidden', 'true');
      }
      backdrop.classList.remove('is-open');
    });
  });
  document.querySelectorAll('.map-pin-button').forEach(function (marker) {
    marker.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const item = listings.find(function (entry) { return String(entry.id) === String(marker.dataset.mapItem); }) || listings[0];
      document.querySelectorAll('.map-pin-button').forEach(function (pin) { pin.classList.remove('is-selected'); });
      marker.classList.add('is-selected');
      document.querySelectorAll('.map-preview-card').forEach(function (card) {
        card.innerHTML = '<div><span class="badge-verified">' + icon('verified') + ' Tin xác thực</span><strong>' + item.title + '</strong><span>' + item.price + '/tháng · ' + item.location + '</span></div><a href="/property/' + item.id + '" data-link>' + icon('arrow_forward') + '</a>';
        card.classList.add('has-selection');
        card.querySelector('[data-link]').addEventListener('click', function (navEvent) {
          navEvent.preventDefault();
          navigate('/property/' + item.id);
        });
      });
    });
  });
  document.querySelectorAll('[data-location]').forEach(function (element) {
    element.addEventListener('click', function () {
      const original = element.innerHTML;
      if (!navigator.geolocation) {
        element.innerHTML = icon('location_disabled') + '<span>Không hỗ trợ định vị</span>';
        return;
      }
      element.disabled = true;
      element.classList.add('is-loading');
      element.innerHTML = icon('progress_activity') + '<span>Đang lấy vị trí...</span>';
      navigator.geolocation.getCurrentPosition(
        function () {
          element.disabled = false;
          element.classList.remove('is-loading');
          element.innerHTML = icon('my_location') + '<span>Đã xác định vị trí</span>';
          element.classList.add('is-located');
        },
        function () {
          element.disabled = false;
          element.classList.remove('is-loading');
          element.innerHTML = original;
        },
        { enableHighAccuracy: false, timeout: 7000 }
      );
    });
  });
  document.querySelectorAll('.assistant-choice').forEach(function (choice) {
    choice.addEventListener('click', function () {
      const multi = choice.closest('.assistant-multi');
      if (multi) choice.classList.toggle('active');
      else {
        Array.from(choice.parentElement.children).forEach(function (item) { item.classList.remove('active'); });
        choice.classList.add('active');
      }
    });
  });
  const savePreferences = document.querySelector('#savePreferences');
  if (savePreferences) {
    savePreferences.addEventListener('click', function () {
      localStorage.setItem('80land:preferences', 'saved');
      navigate('/search?personalized=1');
    });
  }
  const nextListingStep = document.querySelector('#nextListingStep');
  if (nextListingStep) {
    nextListingStep.addEventListener('click', function () {
      document.querySelectorAll('.listing-stepper .listing-step').forEach(function (step, index) {
        step.classList.toggle('active', index === 1);
      });
      const progress = document.querySelector('.listing-progress i');
      if (progress) progress.style.width = '50%';
      const label = document.querySelector('.listing-progress span');
      if (label) label.textContent = '50% hoàn thành';
      nextListingStep.innerHTML = 'Tiếp tục ' + icon('arrow_forward');
    });
  }
  const resultSearchInput = document.querySelector('#resultSearchInput');
  if (resultSearchInput) {
    resultSearchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') navigate('/search?q=' + encodeURIComponent(resultSearchInput.value.trim()));
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
