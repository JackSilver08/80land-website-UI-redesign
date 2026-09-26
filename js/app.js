
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
            '<a href="/wallet" data-link class="user-dropdown-item" role="menuitem">' + icon('account_balance_wallet') + '<span>Ví & thu nhập</span></a>',
            '<a href="/referrals" data-link class="user-dropdown-item" role="menuitem">' + icon('group_add') + '<span>Giới thiệu bạn bè</span></a>',
            '<a href="/profile" data-link class="user-dropdown-item" role="menuitem">' + icon('person') + '<span>Trang cá nhân</span></a>',
            '<div class="user-dropdown-divider"></div>',
            '<button type="button" class="user-dropdown-item user-logout" id="logoutBtn" role="menuitem">' + icon('logout') + '<span>Đăng xuất</span></button>',          '</div>',
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
    items.map(function (item, index) {
      const visual = index === 4
        ? '<span class="mobile-nav-avatar" aria-hidden="true">QT</span>'
        : icon(item[1]);
      return '<div class="col"><a href="' + item[0] + '" data-link class="d-block py-2 small text-secondary"><div class="mobile-nav-icon">' + visual + '</div><span>' + item[2] + '</span></a></div>';
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
              '<a href="/map" data-link class="btn btn-light border">' + icon('my_location') + ' Tìm quanh tôi</a>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',
      '<div class="hero-orbit" aria-hidden="true"></div>',
      '<div class="hero-search home-hero-search">',
        '<div class="hero-search-row">',
          '<label class="hero-search-input"><span>' + icon('search') + '</span><input id="heroSearchInput" name="q" type="search" inputmode="search" autocomplete="off" placeholder="Bạn muốn tìm phòng ở đâu?" aria-label="Tìm phòng"></label>',
          '<a href="/search" data-link class="hero-filter-btn" data-tooltip="Bộ lọc">' + icon('tune') + '<span class="filter-label">Bộ lọc</span></a>',
        '</div>',
        '<div class="hero-quick-searches"><span>Tìm nhanh:</span><a href="/search" data-link>TP.HCM</a><a href="/search" data-link>Hà Nội</a><a href="/search" data-link>Đồng Nai</a><a href="/search" data-link>Đà Nẵng</a></div>',
      '</div>',
    '</section>'
  ].join('');
}

function homePage() {
  const categories = [
    ['Phòng trọ','14.230','bi-house-door-fill'],
    ['Chung cư','6.840','bi-buildings-fill'],
    ['Nhà nguyên căn','3.120','bi-house-fill'],
    ['Căn hộ dịch vụ','2.980','bi-building-fill'],
    ['Mặt bằng kinh doanh','1.110','bi-shop'],
    ['Pass phòng','860','bi-arrow-left-right'],
    ['Ở ghép','2.450','bi-people-fill'],
    ['Tất cả','32.540','bi-grid-fill']
  ];
  return [
    '<main class="page-content"><div class="container-xl">',
      hero(),
      '<section class="home-section home-categories-section">',
        '<div class="home-section-head"><div><span class="home-eyebrow">Khám phá</span><h2>Tìm theo loại hình</h2><p>Chọn đúng loại chỗ ở để rút ngắn thời gian tìm kiếm.</p></div><a href="/search" data-link class="home-section-link">Tất cả ' + icon('arrow_forward') + '</a></div>',
        '<div class="home-category-grid">',
          categories.map(function (item) {
            return '<a href="/search" data-link class="home-category-card">' +
              '<span class="home-category-icon"><i class="bi ' + item[2] + '" aria-hidden="true"></i></span>' +
              '<span class="home-category-copy"><strong>' + item[0] + '</strong><small>' + item[1] + ' tin</small></span>' +
            '</a>';
          }).join(''),
        '</div>',
      '</section>',

      '<section class="home-section home-recommendation-section">',
        '<div class="home-section-head"><div><span class="home-eyebrow">' + icon('auto_awesome') + ' Cá nhân hóa</span><h2>Đề xuất cho bạn</h2><p>Ưu tiên theo khu vực, mức giá và tiện ích bạn quan tâm.</p></div><a href="/assistant" data-link class="home-section-link">Thiết lập nhu cầu ' + icon('arrow_forward') + '</a></div>',
        '<div class="row g-3">' + listings.map(function (item) {
          return '<div class="col-6 col-lg"><a href="' + detailHref(item.id) + '" data-link class="text-decoration-none text-dark">' + propertyCard(item) + '</a></div>';
        }).join('') + '</div>',
      '</section>',

      '<section class="home-section home-tools-section">',
        '<div class="home-tools-grid">',
          '<article class="home-assistant-card">',
            '<div class="home-tool-content"><span class="assistant-kicker">' + icon('auto_awesome') + ' 80LAND ASSISTANT</span><h2>Tìm phòng bằng cách nói nhu cầu của bạn</h2><p>Ví dụ: “Phòng dưới 4 triệu, có máy lạnh, gần trường và không chung chủ”.</p>',
            '<div class="home-assistant-prompts"><span>Dưới 4 triệu</span><span>WC riêng</span><span>Có ban công</span><span>Nuôi thú cưng</span></div>',
            '<a href="/assistant" data-link class="btn btn-80-primary">' + icon('chat') + ' Mở 80Land Assistant</a></div>',
            '<div class="home-assistant-art" aria-hidden="true"><span>' + icon('auto_awesome') + '</span><i></i><i></i><i></i></div>',
          '</article>',
          '<article class="home-map-card">',
            '<div class="home-map-header"><div><span class="home-eyebrow">' + icon('map') + ' Vị trí thực tế</span><h2>Tìm quanh tôi</h2><p>Xem phòng gần vị trí hiện tại trên bản đồ.</p></div><a href="/map" data-link class="icon-button-80">' + icon('arrow_forward') + '</a></div>',
            '<div class="home-mini-map" aria-hidden="true"><span class="mini-map-road road-1"></span><span class="mini-map-road road-2"></span><span class="mini-map-pin pin-1">4,2tr</span><span class="mini-map-pin pin-2">3,8tr</span><span class="mini-map-pin pin-3">5,0tr</span><span class="mini-map-you">' + icon('my_location') + '</span></div>',
            '<a href="/map" data-link class="home-map-action">' + icon('my_location') + ' Mở bản đồ</a>',
          '</article>',
        '</div>',
      '</section>',

      '<section class="home-section home-area-section">',
        '<div class="home-section-head"><div><span class="home-eyebrow">' + icon('location_city') + ' Khu vực</span><h2>Khám phá khu vực</h2><p>Tìm phòng theo tỉnh, thành phố bạn muốn ở.</p></div><a href="/provinces" data-link class="home-section-link">Xem tất cả ' + icon('arrow_forward') + '</a></div>',
        '<div class="row g-3">' + provinces.map(function (province) {
          return '<div class="col-6 col-md-4 col-lg-3"><a href="/province/' + province.id + '" data-link class="home-area-card card-80 d-block">' +
            '<span class="home-area-icon">' + icon('location_city') + '</span>' +
            '<span class="fw-semibold">' + province.name + '</span>' +
            '<small>' + province.districts.slice(0, 3).join(' · ') + '</small>' +
            '<strong>' + province.count + ' tin</strong>' +
          '</a></div>';
        }).join('') + '</div>',
      '</section>',
    '</div></main>'
  ].join('');
}

function searchState() {
  const params = new URLSearchParams(location.search);
  return {
    q: (params.get('q') || '').trim(),
    price: params.get('price') || 'all',
    type: params.get('type') || 'all',
    amenities: (params.get('amenities') || '').split(',').filter(Boolean),
    sort: params.get('sort') || 'relevance',
    radius: params.get('r') || '2'
  };
}

function listingType(item) {
  return item.id === 3 || item.id === 5 ? 'Chung cư' : 'Phòng trọ';
}

function listingPrice(item) {
  return Number(String(item.price).replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
}

function listingMatches(item, state) {
  const query = state.q.toLowerCase();
  const haystack = [item.title, item.location, item.area, item.features.join(' '), listingType(item)].join(' ').toLowerCase();
  if (query && haystack.indexOf(query) === -1) return false;

  const price = listingPrice(item);
  if (state.price === 'under-4' && price >= 4) return false;
  if (state.price === '4-6' && (price < 4 || price > 6)) return false;
  if (state.price === '6-10' && (price < 6 || price > 10)) return false;

  if (state.type !== 'all' && listingType(item) !== state.type) return false;
  if (state.amenities.length && state.amenities.some(function (amenity) { return item.features.indexOf(amenity) === -1; })) return false;

  return true;
}

function filteredListings(state) {
  const result = listings.filter(function (item) { return listingMatches(item, state); });
  if (state.sort === 'price-asc') result.sort(function (a, b) { return listingPrice(a) - listingPrice(b); });
  if (state.sort === 'price-desc') result.sort(function (a, b) { return listingPrice(b) - listingPrice(a); });
  if (state.sort === 'area-desc') result.sort(function (a, b) { return Number.parseFloat(b.area) - Number.parseFloat(a.area); });
  return result;
}

function statePath(base, state, overrides) {
  const next = Object.assign({}, state, overrides || {});
  const params = new URLSearchParams();
  if (next.q) params.set('q', next.q);
  if (next.price && next.price !== 'all') params.set('price', next.price);
  if (next.type && next.type !== 'all') params.set('type', next.type);
  if (next.amenities && next.amenities.length) params.set('amenities', next.amenities.join(','));
  if (next.sort && next.sort !== 'relevance') params.set('sort', next.sort);
  if (base === '/map' && next.radius) params.set('r', next.radius);
  const query = params.toString();
  return query ? base + '?' + query : base;
}

function filterOption(group, value, label, active) {
  return '<button type="button" class="filter-option' + (active ? ' active' : '') + '" data-filter-option data-filter-group="' + group + '" data-filter-value="' + value + '">' + label + '</button>';
}

function renderFilterSheet(id, title, subtitle, state, base) {
  const priceOptions = [
    ['all', 'Tất cả'],
    ['under-4', 'Dưới 4 triệu'],
    ['4-6', '4–6 triệu'],
    ['6-10', '6–10 triệu']
  ];
  const typeOptions = [
    ['all', 'Tất cả'],
    ['Phòng trọ', 'Phòng trọ'],
    ['Chung cư', 'Chung cư']
  ];
  const amenities = ['WC riêng', 'Máy lạnh', 'Ban công', 'Gác', 'Không chung chủ'];
  return [
    '<div class="filter-sheet-backdrop" id="' + id + 'Backdrop"></div>',
    '<aside class="filter-sheet" id="' + id + '" data-filter-base="' + base + '" aria-hidden="true">',
      '<div class="filter-sheet-grabber"></div>',
      '<div class="filter-sheet-head"><div><strong>' + title + '</strong><small>' + subtitle + '</small></div><button type="button" class="icon-button" data-filter-close aria-label="Đóng bộ lọc">' + icon('close') + '</button></div>',
      '<div class="filter-sheet-body">',
        '<div class="filter-group"><span>Khoảng giá</span><div class="filter-option-row">' + priceOptions.map(function (item) { return filterOption('price', item[0], item[1], state.price === item[0]); }).join('') + '</div></div>',
        '<div class="filter-group"><span>Loại hình</span><div class="filter-option-row">' + typeOptions.map(function (item) { return filterOption('type', item[0], item[1], state.type === item[0]); }).join('') + '</div></div>',
        '<div class="filter-group"><span>Tiện ích bắt buộc</span><div class="filter-check-grid">' + amenities.map(function (amenity) {
          return '<label><input type="checkbox" data-filter-amenity="' + amenity + '"' + (state.amenities.indexOf(amenity) > -1 ? ' checked' : '') + '> ' + amenity + '</label>';
        }).join('') + '</div></div>',
      '</div>',
      '<div class="filter-sheet-foot"><button type="button" class="btn btn-80-outline" data-filter-reset>Đặt lại</button><button type="button" class="btn btn-80-primary flex-grow-1" data-filter-apply>Áp dụng</button></div>',
    '</aside>'
  ].join('');
}

function renderSortMenu(state, base) {
  const items = [
    ['relevance', 'Phù hợp nhất'],
    ['price-asc', 'Giá thấp đến cao'],
    ['price-desc', 'Giá cao đến thấp'],
    ['area-desc', 'Diện tích lớn nhất']
  ];
  return '<div class="sort-menu" id="searchSortMenu" aria-hidden="true">' +
    items.map(function (item) {
      return '<button type="button" class="' + (state.sort === item[0] ? 'active' : '') + '" data-sort-value="' + item[0] + '" data-sort-base="' + base + '">' + icon(state.sort === item[0] ? 'check' : 'sort') + '<span>' + item[1] + '</span></button>';
    }).join('') +
  '</div>';
}

function searchPage() {
  const state = searchState();
  const results = filteredListings(state);
  const searchLabel = state.q || 'TP. Hồ Chí Minh';
  const resultCount = results.length;
  const activeFilterCount = (state.price !== 'all' ? 1 : 0) + (state.type !== 'all' ? 1 : 0) + state.amenities.length;
  const priceLabel = state.price === 'under-4' ? 'Dưới 4 triệu' : state.price === '4-6' ? '4–6 triệu' : state.price === '6-10' ? '6–10 triệu' : 'Giá';
  const typeLabel = state.type === 'all' ? 'Loại phòng' : state.type;
  const amenitiesLabel = state.amenities.length ? 'Tiện ích (' + state.amenities.length + ')' : 'Tiện ích';
  const sortLabel = state.sort === 'price-asc' ? 'Giá thấp đến cao' : state.sort === 'price-desc' ? 'Giá cao đến thấp' : state.sort === 'area-desc' ? 'Diện tích lớn nhất' : 'Phù hợp nhất';
  const markerPositions = [[18,26],[46,47],[70,30],[34,68],[78,65],[59,20]];
  const mapItems = results.slice(0, markerPositions.length);
  const cards = results.map(function (item) {
    return '<a href="' + detailHref(item.id) + '" data-link class="text-decoration-none text-dark"><article class="result-card result-card-modern">' +
      '<div class="thumb"><img src="' + item.image + '" alt="' + item.title.replace(/"/g, '&quot;') + '" loading="lazy"><button class="result-save" type="button" data-save="' + item.id + '">' + icon('favorite_border') + '</button>' +
      (item.verified ? '<span class="result-verified">' + icon('verified') + ' Xác thực</span>' : '') + '</div>' +
      '<div class="result-card-body"><div class="property-price">' + item.price + '/tháng</div><div class="property-title">' + item.title + '</div>' +
      '<div class="result-meta-row"><span>' + icon('location_on') + ' ' + item.location + '</span><span>' + icon('straighten') + ' ' + item.area + '</span></div>' +
      '<div class="result-feature-row">' + item.features.slice(0, 2).map(function (feature) { return '<span>' + feature + '</span>'; }).join('') + '</div></div>' +
    '</article></a>';
  }).join('');
  const emptyState = '<div class="search-empty-state"><span>' + icon('travel_explore') + '</span><strong>Chưa có tin phù hợp</strong><p>Thử bỏ bớt bộ lọc hoặc đổi khu vực tìm kiếm.</p><a href="/search" data-link class="btn btn-80-outline">Xóa bộ lọc</a></div>';
  const markers = mapItems.map(function (item, index) {
    const position = markerPositions[index];
    return '<button type="button" class="map-pin map-pin-button" style="left:' + position[0] + '%;top:' + position[1] + '%" data-map-item="' + item.id + '"><span class="map-pin-price">' + item.price.replace(' triệu', 'tr') + '</span></button>';
  }).join('');
  return [
    '<main class="page-content page-content-mobile search-page"><div class="container-xl">',
      '<section class="search-toolbar">',
        '<div class="search-toolbar-main">',
          '<a href="/" data-link class="search-back" aria-label="Quay lại">' + icon('arrow_back') + '</a>',
          '<label class="search-toolbar-input"><span>' + icon('search') + '</span><input id="resultSearchInput" value="' + searchLabel.replace(/"/g, '&quot;') + '" placeholder="Tìm quận, thành phố hoặc từ khóa" aria-label="Tìm kiếm"></label>',
          '<button type="button" class="search-toolbar-location" data-location aria-label="Tìm quanh tôi"><span>' + icon('my_location') + '</span><span>Quanh tôi</span></button>',
        '</div>',
        '<div class="search-toolbar-actions">',
          '<button type="button" class="filter-chip' + (activeFilterCount ? ' active' : '') + '" data-filter-toggle><span>' + icon('tune') + '</span> Bộ lọc' + (activeFilterCount ? ' (' + activeFilterCount + ')' : '') + '</button>',
          '<button type="button" class="filter-chip' + (state.price !== 'all' ? ' active' : '') + '" data-filter-toggle data-filter-focus="price">' + priceLabel + '</button>',
          '<button type="button" class="filter-chip' + (state.type !== 'all' ? ' active' : '') + '" data-filter-toggle data-filter-focus="type">' + typeLabel + '</button>',
          '<button type="button" class="filter-chip' + (state.amenities.length ? ' active' : '') + '" data-filter-toggle data-filter-focus="amenity">' + amenitiesLabel + '</button>',
          '<div class="sort-control"><button type="button" class="filter-chip filter-chip-sort" data-sort-toggle>' + sortLabel + ' ' + icon('expand_more') + '</button>' + renderSortMenu(state, '/search') + '</div>',
        '</div>',
      '</section>',
      '<div class="search-status-row"><div><strong>' + resultCount + ' tin mẫu</strong><span> tại ' + searchLabel + '</span></div><div class="search-status-actions"><a href="/assistant" data-link class="recommend-link">' + icon('auto_awesome') + ' Gợi ý theo nhu cầu</a><a href="' + statePath('/map', state) + '" data-link class="mobile-map-link">' + icon('map') + ' Mở bản đồ</a></div></div>',
      '<div class="search-layout">',
        '<section class="search-results-column">',
          '<div class="search-result-grid">' + (cards || emptyState) + '</div>',
        '</section>',
        '<aside class="search-map-panel">',
          '<div class="map-panel-head"><div><strong>Bản đồ khu vực</strong><small>' + resultCount + ' tin mẫu trong vùng tìm kiếm</small></div><button class="map-locate-btn" type="button" data-location aria-label="Lấy vị trí">' + icon('my_location') + '</button></div>',
          '<div class="split-map search-map">',
            '<span class="map-neighborhood-label label-a">Bình Thạnh</span><span class="map-neighborhood-label label-b">Thủ Đức</span><span class="map-neighborhood-label label-c">Quận 7</span>',
            markers || '<span class="map-no-results">' + icon('search_off') + ' Không có điểm phù hợp</span>',
            '<div class="map-preview-card" id="mapPreviewCard"><div><span class="badge-verified">' + icon('verified') + ' Tin xác thực</span><strong>Chọn một điểm trên bản đồ</strong><span>Thông tin phòng sẽ hiện tại đây.</span></div></div>',
          '</div>',
        '</aside>',
      '</div>',
      renderFilterSheet('searchFilterSheet', 'Bộ lọc tìm phòng', 'Chọn tiêu chí bạn thực sự cần', state, '/search'),
    '</div></main>',
  ].join('');
}

function mapPage() {
  const state = searchState();
  const radius = state.radius || '2';
  const results = filteredListings(state);
  const markerPositions = [[18,26],[46,47],[70,30],[34,68],[78,65],[59,20]];
  const mapItems = results.slice(0, markerPositions.length);
  const markerHtml = mapItems.map(function (item, index) {
    const position = markerPositions[index];
    return '<button type="button" class="map-pin map-pin-button" style="left:' + position[0] + '%;top:' + position[1] + '%" data-map-item="' + item.id + '"><span class="map-pin-price">' + item.price.replace(' triệu', 'tr') + '</span></button>';
  }).join('');
  const radiusOptions = ['1','2','5'].map(function (value) {
    return '<a href="' + statePath('/map', state, { radius: value }) + '" data-link class="' + (radius === value ? 'active' : '') + '">' + value + ' km</a>';
  }).join('');
  return [
    '<main class="page-content page-content-mobile"><div class="container-xl">',
      '<section class="page-hero map-page-hero"><div><a href="' + statePath('/search', state) + '" data-link class="text-80-muted small">' + icon('arrow_back') + ' Kết quả</a><h1>Tìm phòng quanh bạn</h1><p>Chọn bán kính hoặc dùng vị trí hiện tại để khám phá phòng gần nhất.</p></div><div class="map-radius-picker"><span>Bán kính</span>' + radiusOptions + '</div></section>',
      '<div class="map-experience">',
        '<div class="split-map full-map">',
          '<span class="map-neighborhood-label label-a">Bình Thạnh</span><span class="map-neighborhood-label label-b">Thủ Đức</span><span class="map-neighborhood-label label-c">Quận 7</span>',
          markerHtml || '<span class="map-no-results">' + icon('search_off') + ' Không có điểm phù hợp</span>',
          '<button type="button" class="map-control map-control-locate" data-location>' + icon('my_location') + '<span>Vị trí của tôi</span></button>',
          '<button type="button" class="map-control map-control-filter" data-filter-toggle>' + icon('tune') + '<span>Bộ lọc</span></button>',
          '<div class="map-floating-summary"><strong>' + results.length + ' tin mẫu trong ' + radius + ' km</strong><span>' + (state.q || 'TP.HCM') + ' · ' + (state.price === 'all' ? 'mọi mức giá' : state.price === 'under-4' ? 'dưới 4 triệu' : state.price === '4-6' ? '4–6 triệu' : '6–10 triệu') + (state.amenities.length ? ' · ' + state.amenities.join(', ') : '') + '</span><a href="' + statePath('/search', state) + '" data-link>Danh sách ' + icon('arrow_forward') + '</a></div>',
        '</div>',
      '</div>',
      '<div class="map-mobile-results"><div class="section-label-row"><strong>Phòng gần bạn</strong><a href="' + statePath('/search', state) + '" data-link>Xem danh sách</a></div><div class="horizontal-property-list">' +
        results.slice(0, 3).map(function (item) { return '<a href="' + detailHref(item.id) + '" data-link>' + propertyCard(item) + '</a>'; }).join('') +
      '</div></div>',
      renderFilterSheet('mapFilterSheet', 'Bộ lọc bản đồ', 'Thu hẹp khu vực theo nhu cầu', state, '/map'),
    '</div></main>'
  ].join('');
}

function detailHref(id) {
  const source = (location.pathname === '/search' || location.pathname === '/map') ? location.pathname + location.search : '';
  return '/property/' + id + (source ? '?from=' + encodeURIComponent(source) : '');
}

function detailBackHref() {
  const from = new URLSearchParams(location.search).get('from') || '';
  return /^\/(search|map)(\?|$)/.test(from) ? from : '/search';
}

function detailPage(id) {
  const item = listings.find(function (entry) { return String(entry.id) === String(id); }) || listings[0];
  const gallery = item.gallery && item.gallery.length ? item.gallery : [item.image];
  const backHref = detailBackHref();
  const related = listings.filter(function (entry) { return entry.id !== item.id; }).slice(0, 3);
  const featureIcons = ['bathroom', 'ac_unit', 'balcony', 'lock'];
  return [
    '<main class="page-content page-content-mobile detail-page"><div class="container-xl">',
      '<div class="detail-breadcrumb"><a href="' + backHref + '" data-link>' + icon('arrow_back') + ' Kết quả tìm kiếm</a><span>/</span><span>' + item.location + '</span></div>',
      '<div class="detail-hero-grid">',
        '<section class="detail-gallery-shell">',
          '<div class="detail-main-media">',
            '<img id="detailMainImage" src="' + gallery[0] + '" alt="' + item.title.replace(/"/g, '&quot;') + '">',
            '<div class="detail-media-top">',
              item.verified ? '<span class="badge-verified">' + icon('verified') + ' Tin xác thực</span>' : '<span class="detail-media-label">' + icon('visibility') + ' Tin mẫu</span>',
              '<button type="button" class="detail-media-action" data-detail-save="' + item.id + '" aria-pressed="false">' + icon('favorite_border') + '<span>Lưu</span></button>',
            '</div>',
          '</div>',
          '<div class="detail-gallery-strip">' +
            gallery.map(function (src, index) {
              return '<button type="button" class="gallery-thumb' + (index === 0 ? ' active' : '') + '" data-gallery-src="' + src + '" data-gallery-index="' + index + '" aria-label="Xem ảnh ' + (index + 1) + '"><img src="' + src + '" alt=""></button>';
            }).join('') +
          '</div>',
        '</section>',
        '<aside class="detail-summary card-80">',
          '<div class="detail-summary-kicker"><span>' + icon(listingType(item) === 'Chung cư' ? 'apartment' : 'home_work') + ' ' + listingType(item) + '</span><span>' + (item.verified ? 'Đã xác thực' : 'Thông tin mẫu') + '</span></div>',
          '<h1>' + item.title + '</h1>',
          '<div class="detail-price">' + item.price + '<small>/tháng</small></div>',
          '<a href="/map" data-link class="detail-location">' + icon('location_on') + '<span>' + item.location + '</span><span class="material-symbols-outlined">arrow_forward</span></a>',
          '<div class="detail-stat-grid">',
            '<div class="detail-stat"><span>' + icon('straighten') + '</span><div><strong>' + item.area + '</strong><small>Diện tích</small></div></div>',
            '<div class="detail-stat"><span>' + icon('category') + '</span><div><strong>' + listingType(item) + '</strong><small>Loại hình</small></div></div>',
            '<div class="detail-stat"><span>' + icon('verified') + '</span><div><strong>' + (item.verified ? 'Đã xác thực' : 'Đang cập nhật') + '</strong><small>Trạng thái</small></div></div>',
            '<div class="detail-stat"><span>' + icon('bolt') + '</span><div><strong>' + item.features[0] + '</strong><small>Nổi bật</small></div></div>',
          '</div>',
          '<div class="detail-summary-features"><div class="detail-section-label">Điểm nổi bật</div><div class="detail-feature-pills">' +
            item.features.map(function (feature, index) {
              return '<span><i>' + icon(featureIcons[index % featureIcons.length]) + '</i>' + feature + '</span>';
            }).join('') +
          '</div></div>',
          '<div class="detail-primary-actions">',
            '<button type="button" class="btn btn-80-primary" data-detail-save="' + item.id + '" aria-pressed="false">' + icon('favorite_border') + ' Lưu tin</button>',
            '<a href="/assistant" data-link class="btn btn-80-dark">' + icon('auto_awesome') + ' Hỏi 80Land Assistant</a>',
          '</div>',
          '<div class="detail-safety-note"><span>' + icon('shield') + '</span><div><strong>An toàn khi tìm phòng</strong><small>Không chuyển cọc trước khi xác minh phòng và người đăng.</small></div></div>',
        '</aside>',
      '</div>',

      '<div class="detail-content-grid">',
        '<div class="detail-content-main">',
          '<section class="detail-panel card-80">',
            '<div class="detail-panel-head"><div><span class="detail-overline">Thông tin</span><h2>Mô tả phòng</h2></div></div>',
            '<p>Đây là nội dung mô tả mẫu của 80Land. Phòng có diện tích <strong>' + item.area + '</strong>, nằm tại <strong>' + item.location + '</strong> và được đăng với mức giá <strong>' + item.price + '/tháng</strong>.</p>',
            '<p>Tin đăng sẽ hiển thị đầy đủ thông tin do người cho thuê cung cấp, bao gồm tình trạng phòng, quy định, chi phí liên quan và thời gian có thể vào ở.</p>',
          '</section>',
          '<section class="detail-panel card-80">',
            '<div class="detail-panel-head"><div><span class="detail-overline">Tiện ích</span><h2>Tiện nghi của phòng</h2></div></div>',
            '<div class="detail-amenity-grid">' +
              item.features.map(function (feature, index) {
                return '<div class="detail-amenity"><span>' + icon(featureIcons[index % featureIcons.length]) + '</span><div><strong>' + feature + '</strong><small>Được người đăng cung cấp trong tin</small></div></div>';
              }).join('') +
              '<div class="detail-amenity"><span>' + icon('directions_car') + '</span><div><strong>Thông tin gửi xe</strong><small>Liên hệ người đăng để xác nhận</small></div></div>' +
              '<div class="detail-amenity"><span>' + icon('payments') + '</span><div><strong>Chi phí khác</strong><small>Chưa cập nhật trong dữ liệu mẫu</small></div></div>',
            '</div>',
          '</section>',
          '<section class="detail-panel card-80">',
            '<div class="detail-panel-head"><div><span class="detail-overline">Vị trí</span><h2>Khám phá khu vực</h2></div><a href="/map" data-link>' + icon('map') + ' Mở bản đồ</a></div>',
            '<div class="detail-map">',
              '<span class="detail-map-road road-one"></span><span class="detail-map-road road-two"></span>',
              '<span class="detail-map-area area-one">Bình Thạnh</span><span class="detail-map-area area-two">Thủ Đức</span>',
              '<span class="detail-map-pin">' + icon('location_on') + '</span>',
              '<div class="detail-map-caption"><strong>' + item.location + '</strong><span>Vị trí hiển thị ở mức khu vực để bảo vệ thông tin riêng tư.</span></div>',
            '</div>',
          '</section>',
        '</div>',
        '<aside class="detail-content-side">',
          '<section class="detail-panel card-80 detail-poster-card">',
            '<span class="detail-overline">Người đăng</span>',
            '<div class="detail-poster-head"><div class="detail-poster-avatar">NM</div><div><strong>Người cho thuê</strong><small>Hồ sơ mẫu trên 80Land</small></div></div>',
            '<div class="detail-poster-status"><span>' + icon('verified') + ' Đã xác thực tin</span><span>' + icon('schedule') + ' Phản hồi nhanh</span></div>',
            '<button type="button" class="btn btn-80-outline w-100" data-contact-demo>' + icon('call') + ' Liên hệ chủ nhà</button>',
            '<a href="/assistant" data-link class="btn btn-80-primary w-100 mt-2">' + icon('auto_awesome') + ' Hỏi 80Land Assistant</a>',
            '<div class="detail-contact-notice" id="detailContactNotice" hidden>' + icon('info') + '<span>Dữ liệu đang ở chế độ demo. Khi kết nối backend, nút này sẽ mở thông tin liên hệ của người đăng.</span></div>',
          '</section>',
          '<section class="detail-panel card-80 detail-trust-card"><span class="detail-overline">Lưu ý an toàn</span><div class="detail-trust-row"><span>' + icon('verified_user') + '</span><div><strong>Kiểm tra trước khi cọc</strong><small>Xem phòng, xác nhận người đăng và thống nhất toàn bộ chi phí.</small></div></div><div class="detail-trust-row"><span>' + icon('report') + '</span><div><strong>Báo cáo tin bất thường</strong><small>Không chia sẻ OTP hoặc chuyển tiền khi chưa xác minh.</small></div></div></section>',
        '</aside>',
      '</div>',

      '<section class="detail-related"><div class="detail-related-head"><div><span class="detail-overline">Gợi ý tiếp theo</span><h2>Có thể bạn cũng quan tâm</h2></div><a href="/search" data-link>Xem thêm ' + icon('arrow_forward') + '</a></div><div class="row g-3">' +
        related.map(function (entry) {
          return '<div class="col-6 col-lg-4"><a href="' + detailHref(entry.id) + '" data-link class="text-decoration-none text-dark">' + propertyCard(entry) + '</a></div>';
        }).join('') +
      '</div></section>',
    '</div>',
    '<div class="detail-mobile-bar"><button type="button" class="detail-mobile-save" data-detail-save="' + item.id + '" aria-pressed="false">' + icon('favorite_border') + '<span>Lưu</span></button><a href="/assistant" data-link class="btn btn-80-primary">' + icon('auto_awesome') + ' Hỏi 80Land Assistant</a></div>',
    '</main>'
  ].join('');
}

function simpleListPage(title, subtitle, rows, actions) {
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><h1>' + title + '</h1><p>' + subtitle + '</p></section><div class="d-grid gap-2">' +
    rows.map(function (row) {
      return '<div class="card-80 p-3"><strong class="small">' + row.title + '</strong><div class="text-80-muted small mt-1">' + row.body + '</div>' + (row.link ? '<a href="' + row.link + '" data-link class="btn btn-sm btn-outline-secondary mt-2">Xem</a>' : '') + '</div>';
    }).join('') +
    '</div>' + (actions || '') + '</div></main>';
}

function getProfileState() {
  let profile = { name:'Quang Tuấn', city:'TP. Hồ Chí Minh' };
  try {
    const stored = JSON.parse(localStorage.getItem('80land:profile') || 'null');
    if (stored) profile = Object.assign(profile, stored);
  } catch (error) {}
  return profile;
}

function getNotificationRows() {
  const read = JSON.parse(localStorage.getItem('80land:notifications:read') || '[]');
  return notifications.map(function (item) {
    return Object.assign({}, item, { unread: item.unread && read.indexOf(item.id) === -1 });
  });
}

function getSavedListingIds() {
  const marker = localStorage.getItem('80land:saved:initialized');
  if (!marker) {
    [1, 2, 3].forEach(function (id) { localStorage.setItem('80land:saved:' + id, '1'); });
    localStorage.setItem('80land:saved:initialized', '1');
  }
  return listings.filter(function (item) {
    return localStorage.getItem('80land:saved:' + item.id) === '1';
  }).map(function (item) { return item.id; });
}

function savedPage() {
  const ids = getSavedListingIds();
  const saved = listings.filter(function (item) { return ids.indexOf(item.id) > -1; });
  return [
    '<main class="page-content page-content-mobile account-page"><div class="container-xl">',
      '<section class="account-page-head"><div><span class="account-overline">' + icon('favorite') + ' Đã lưu</span><h1>Những phòng bạn đang quan tâm</h1><p>Lưu lại các tin phù hợp để so sánh, mở lại hoặc chuyển sang bước liên hệ.</p></div><a href="/search" data-link class="btn btn-80-primary">' + icon('search') + ' Tìm thêm phòng</a></section>',
      '<div class="account-summary-strip">',
        '<div><span>' + icon('favorite') + '</span><strong id="savedCount">' + saved.length + '</strong><small>Tin đã lưu</small></div>',
        '<div><span>' + icon('compare_arrows') + '</span><strong>' + Math.min(saved.length, 3) + '</strong><small>Có thể so sánh</small></div>',
        '<div><span>' + icon('schedule') + '</span><strong>24h</strong><small>Gợi ý mới nhất</small></div>',
      '</div>',
      saved.length ? '<section class="saved-grid" id="savedGrid">' + saved.map(function (item) {
        return '<article class="saved-listing-card card-80" data-saved-card="' + item.id + '"><div class="saved-listing-media"><img src="' + item.image + '" alt="' + item.title.replace(/"/g, '&quot;') + '"><button type="button" class="saved-remove" data-saved-remove="' + item.id + '" aria-label="Bỏ lưu">' + icon('favorite') + '</button>' + (item.verified ? '<span class="badge-verified">' + icon('verified') + ' Xác thực</span>' : '') + '</div><div class="saved-listing-body"><div class="property-price">' + item.price + '/tháng</div><strong>' + item.title + '</strong><span>' + item.location + ' · ' + item.area + '</span><div class="saved-listing-actions"><a href="' + detailHref(item.id) + '" data-link class="btn btn-80-outline">' + icon('visibility') + ' Xem tin</a><a href="/assistant" data-link class="btn btn-80-primary">' + icon('auto_awesome') + ' Hỏi Assistant</a></div></div></article>';
      }).join('') + '</section>' : '<section class="account-empty card-80"><span>' + icon('favorite_border') + '</span><strong>Bạn chưa lưu tin nào</strong><p>Khám phá các phòng phù hợp và lưu lại những tin bạn muốn xem sau.</p><a href="/search" data-link class="btn btn-80-primary">Tìm phòng ngay</a></section>',
      '<section class="account-info-banner"><span>' + icon('tips_and_updates') + '</span><div><strong>Mẹo nhỏ</strong><p>Bạn có thể dùng 80Land Assistant để tìm thêm tin tương tự từ những tiêu chí của các phòng đang lưu.</p></div><a href="/assistant" data-link>' + icon('arrow_forward') + '</a></section>',
    '</div></main>'
  ].join('');
}

function notificationsPage() {
  const rows = getNotificationRows();
  const unread = rows.filter(function (item) { return item.unread; });
  return [
    '<main class="page-content page-content-mobile account-page"><div class="container-xl">',
      '<section class="account-page-head"><div><span class="account-overline">' + icon('notifications') + ' Thông báo</span><h1>Cập nhật mới nhất của bạn</h1><p>Những thay đổi liên quan đến tin đăng, gợi ý và hoạt động tài khoản 80Land.</p></div><button type="button" class="account-head-action" id="markAllNotifications">' + icon('done_all') + ' Đánh dấu đã đọc</button></section>',
      '<div class="notification-toolbar"><span><strong id="notificationUnreadCount">' + unread.length + '</strong> thông báo chưa đọc</span><div><button type="button" class="notification-filter active" data-notification-filter="all">Tất cả</button><button type="button" class="notification-filter" data-notification-filter="unread">Chưa đọc</button></div></div>',
      '<section class="notification-list" id="notificationList">' + rows.map(function (item) {
        return '<article class="notification-card card-80' + (item.unread ? ' is-unread' : '') + '" data-notification-card="' + item.id + '" data-unread="' + String(item.unread) + '"><span class="notification-icon ' + (item.unread ? 'is-unread' : '') + '">' + icon(item.unread ? 'notifications_active' : 'notifications_none') + '</span><div class="notification-copy"><div class="notification-top"><strong>' + item.title + '</strong><time>' + (item.unread ? 'Mới' : 'Đã xem') + '</time></div><p>' + item.body + '</p><button type="button" class="notification-read-toggle" data-notification-read="' + item.id + '">' + (item.unread ? 'Đánh dấu đã đọc' : 'Đã đọc') + '</button></div></article>';
      }).join('') + '</section>',
    '</div></main>'
  ].join('');
}

function profilePage() {
  return [
    '<main class="page-content page-content-mobile account-page"><div class="container-xl">',
      '<section class="account-profile-hero card-80">',
        '<div class="account-profile-main"><div class="account-profile-avatar" aria-hidden="true">QT</div><div><span class="account-overline">Tài khoản cá nhân</span><h1>' + getProfileState().name + '</h1><p>Thành viên từ 2026 · ' + getProfileState().city + '</p></div></div>',
        '<button type="button" class="btn btn-80-outline" id="editProfileBtn">' + icon('edit') + ' Chỉnh sửa hồ sơ</button>',
      '</section>',
      '<section class="account-profile-grid">',
        '<div class="account-profile-main-column">',
          '<section class="card-80 account-panel"><div class="account-panel-head"><div><span class="account-overline">Tổng quan</span><h2>Hoạt động của bạn</h2></div></div><div class="account-stat-grid">',
            '<div><span>' + icon('favorite') + '</span><strong>' + getSavedListingIds().length + '</strong><small>Tin đã lưu</small></div>',
            '<div><span>' + icon('notifications') + '</span><strong>' + getNotificationRows().filter(function (item) { return item.unread; }).length + '</strong><small>Thông báo mới</small></div>',
            '<div><span>' + icon('auto_awesome') + '</span><strong>' + (localStorage.getItem('80land:assistant') ? '1' : '0') + '</strong><small>Bộ nhu cầu</small></div>',
          '</div></section>',
          '<section class="card-80 account-panel"><div class="account-panel-head"><div><span class="account-overline">Hồ sơ</span><h2>Thông tin cá nhân</h2></div></div><div class="account-detail-grid">',
            '<div><small>Họ và tên</small><strong id="profileName">' + getProfileState().name + '</strong></div>',
            '<div><small>Khu vực</small><strong id="profileCity">' + getProfileState().city + '</strong></div>',
            '<div><small>Email</small><strong>quangtuan@example.com</strong></div>',
            '<div><small>Số điện thoại</small><strong>Chưa cập nhật</strong></div>',
          '</div><div class="account-profile-note">' + icon('info') + '<span>Thông tin liên hệ thật sẽ được đồng bộ khi tài khoản kết nối backend 80Land.</span></div></section>',
          '<section class="card-80 account-panel"><div class="account-panel-head"><div><span class="account-overline">Cá nhân hóa</span><h2>Nhu cầu tìm phòng</h2></div><a href="/assistant" data-link>' + icon('edit') + ' Chỉnh sửa</a></div><div id="profilePreferenceSummary"></div></section>',
        '</div>',
        '<aside class="account-profile-side">',
          '<section class="card-80 account-menu-panel"><span class="account-overline">Quản lý nhanh</span><div class="account-menu-links"><a href="/saved" data-link>' + icon('favorite') + '<span><strong>Tin đã lưu</strong><small>Mở lại các phòng bạn quan tâm</small></span><b>' + icon('arrow_forward') + '</b></a><a href="/notifications" data-link>' + icon('notifications') + '<span><strong>Thông báo</strong><small>Cập nhật từ 80Land</small></span><b>' + icon('arrow_forward') + '</b></a><a href="/assistant" data-link>' + icon('auto_awesome') + '<span><strong>80Land Assistant</strong><small>Tạo lại bộ tiêu chí tìm phòng</small></span><b>' + icon('arrow_forward') + '</b></a><a href="/landlord" data-link>' + icon('storefront') + '<span><strong>Đăng tin cho thuê</strong><small>Chuyển sang khu vực chủ nhà</small></span><b>' + icon('arrow_forward') + '</b></a></div></section>',
          '<section class="card-80 account-security-panel"><span class="account-overline">Bảo mật</span><div><span>' + icon('shield') + '</span><div><strong>Tài khoản đang ở chế độ demo</strong><p>Khi kết nối backend, khu vực này sẽ chứa đăng nhập, đổi mật khẩu và phiên đăng nhập.</p></div></div></section>',
        '</aside>',
      '</section>',
      '<div class="account-edit-backdrop" id="profileEditBackdrop"></div><aside class="account-edit-sheet" id="profileEditSheet" aria-hidden="true">',
        '<div class="account-edit-head"><div><span class="account-overline">Chỉnh sửa hồ sơ</span><strong>Cập nhật thông tin hiển thị</strong></div><button type="button" class="icon-button" id="profileEditClose">' + icon('close') + '</button></div>',
        '<label class="account-edit-field"><span>Họ và tên</span><input id="profileNameInput" value="' + getProfileState().name.replace(/"/g, '&quot;') + '"></label>',
        '<label class="account-edit-field"><span>Khu vực</span><select id="profileCityInput"><option' + (getProfileState().city === 'TP. Hồ Chí Minh' ? ' selected' : '') + '>TP. Hồ Chí Minh</option><option' + (getProfileState().city === 'Đồng Nai' ? ' selected' : '') + '>Đồng Nai</option><option' + (getProfileState().city === 'Bình Dương' ? ' selected' : '') + '>Bình Dương</option><option' + (getProfileState().city === 'Đà Nẵng' ? ' selected' : '') + '>Đà Nẵng</option><option' + (getProfileState().city === 'Hà Nội' ? ' selected' : '') + '>Hà Nội</option></select></label>',
        '<div class="account-edit-actions"><button type="button" class="btn btn-80-outline" id="profileEditCancel">Hủy</button><button type="button" class="btn btn-80-primary" id="profileEditSave">Lưu thay đổi</button></div>',
      '</aside>',
    '</div></main>'
  ].join('');
}

function assistantStateFromText(text, base) {
  const raw = String(text || '').trim();
  const lower = raw.toLowerCase();
  const next = Object.assign({
    q: base && base.q ? base.q : '',
    price: base && base.price ? base.price : 'all',
    type: base && base.type ? base.type : 'all',
    amenities: base && base.amenities ? base.amenities.slice() : [],
    sort: 'relevance',
    radius: '2'
  });

  if (/dưới\s*4|<\s*4|4\s*triệu/.test(lower) && !/4\s*[-–]\s*6/.test(lower)) next.price = 'under-4';
  else if (/4\s*[-–]\s*6/.test(lower)) next.price = '4-6';
  else if (/6\s*[-–]\s*10/.test(lower)) next.price = '6-10';

  if (lower.includes('chung cư') || lower.includes('căn hộ')) next.type = 'Chung cư';
  else if (lower.includes('phòng trọ') || lower.includes('phòng')) next.type = 'Phòng trọ';

  const amenityMap = [
    ['WC riêng', ['wc riêng','toilet riêng','nhà vệ sinh riêng']],
    ['Máy lạnh', ['máy lạnh','điều hòa','điều hoà']],
    ['Ban công', ['ban công']],
    ['Gác', ['có gác','gác lửng','gác']],
    ['Không chung chủ', ['không chung chủ','không ở chung chủ','không ở cùng chủ']]
  ];
  amenityMap.forEach(function (entry) {
    if (entry[1].some(function (term) { return lower.includes(term); }) && next.amenities.indexOf(entry[0]) === -1) {
      next.amenities.push(entry[0]);
    }
  });

  const locations = ['Bình Thạnh','Thủ Đức','Quận 7','Tân Bình','Gò Vấp','Biên Hòa','Đồng Nai','Hà Nội','Đà Nẵng','Bình Dương'];
  const detectedLocation = locations.find(function (location) { return lower.includes(location.toLowerCase()); });
  if (detectedLocation) next.q = detectedLocation === 'Đồng Nai' ? 'Đồng Nai' : detectedLocation;

  return next;
}

function assistantStateSummary(state) {
  const parts = [];
  parts.push(state.price === 'under-4' ? 'dưới 4 triệu' : state.price === '4-6' ? '4–6 triệu' : state.price === '6-10' ? '6–10 triệu' : 'mọi mức giá');
  if (state.type !== 'all') parts.push(state.type);
  if (state.q) parts.push('khu vực ' + state.q);
  if (state.amenities.length) parts.push(state.amenities.join(', '));
  return parts.join(' · ');
}

function assistantReplyForState(state, results) {
  if (!results.length) {
    return 'Mình chưa thấy tin mẫu nào khớp toàn bộ tiêu chí. Bạn có thể bỏ bớt một tiện ích hoặc mở rộng khoảng giá.';
  }
  return 'Mình đã gom lại theo: ' + assistantStateSummary(state) + '. Có ' + results.length + ' tin mẫu để bạn xem ngay.';
}

function assistantPage() {
  const stored = localStorage.getItem('80land:assistant');
  let savedState = { q:'', price:'all', type:'all', amenities:[], sort:'relevance', radius:'2' };
  try {
    if (stored) savedState = Object.assign(savedState, JSON.parse(stored));
  } catch (error) {}
  const results = filteredListings(savedState);
  const resultCards = results.slice(0, 3).map(function (item) {
    return '<a href="' + detailHref(item.id) + '" data-link class="assistant-result-card text-decoration-none text-dark"><div class="assistant-result-thumb"><img src="' + item.image + '" alt="' + item.title.replace(/"/g, '&quot;') + '"></div><div class="assistant-result-copy"><span class="badge-verified">' + icon(item.verified ? 'verified' : 'home_work') + ' ' + (item.verified ? 'Xác thực' : 'Tin mẫu') + '</span><strong>' + item.title + '</strong><div class="property-price">' + item.price + '/tháng</div><small>' + item.location + ' · ' + item.area + '</small></div></a>';
  }).join('');
  const summary = assistantStateSummary(savedState);
  return [
    '<main class="page-content page-content-mobile assistant-page"><div class="container-xl">',
      '<section class="assistant-page-head"><div><span class="assistant-kicker">' + icon('auto_awesome') + ' 80LAND ASSISTANT</span><h1>Tìm phòng bằng cách nói nhu cầu</h1><p>Viết tự nhiên như bạn đang nói với một người tư vấn. 80Land sẽ chuyển nhu cầu thành bộ lọc tìm phòng.</p></div><button type="button" class="assistant-clear" id="assistantClear">' + icon('restart_alt') + ' Làm mới</button></section>',
      '<div class="assistant-workspace">',
        '<section class="assistant-chat-panel card-80">',
          '<div class="assistant-chat-head"><div class="assistant-avatar">' + icon('auto_awesome') + '</div><div><strong>80Land Assistant</strong><span>Hỗ trợ tìm phòng · phản hồi theo nhu cầu</span></div><span class="assistant-online"><i></i> Đang hoạt động</span></div>',
          '<div class="assistant-chat-body" id="assistantChatBody">',
            '<div class="assistant-message assistant-message-ai"><div class="assistant-bubble-avatar">' + icon('auto_awesome') + '</div><div><p>Chào bạn 👋 Mình có thể giúp lọc phòng theo <strong>giá, khu vực, loại hình và tiện ích</strong>.</p><p>Bạn có thể nói: “Phòng dưới 4 triệu, có máy lạnh, gần Thủ Đức”.</p></div></div>',
            '<div class="assistant-quick-prompts" id="assistantQuickPrompts">',
              '<button type="button" data-assistant-prompt="Phòng dưới 4 triệu">' + icon('payments') + ' Dưới 4 triệu</button>',
              '<button type="button" data-assistant-prompt="Phòng có máy lạnh">' + icon('ac_unit') + ' Có máy lạnh</button>',
              '<button type="button" data-assistant-prompt="Phòng có ban công">' + icon('balcony') + ' Có ban công</button>',
              '<button type="button" data-assistant-prompt="Không chung chủ">' + icon('lock') + ' Không chung chủ</button>',
              '<button type="button" data-assistant-prompt="Phòng ở Biên Hòa">' + icon('location_on') + ' Ở Biên Hòa</button>',
              '<button type="button" data-assistant-prompt="Phòng gần Thủ Đức">' + icon('school') + ' Gần Thủ Đức</button>',
            '</div>',
          '</div>',
          '<form class="assistant-composer" id="assistantForm"><div class="assistant-composer-input"><span>' + icon('edit_note') + '</span><input id="assistantInput" autocomplete="off" placeholder="Ví dụ: Phòng 3–4 triệu, WC riêng, có ban công..." aria-label="Nhu cầu tìm phòng"></div><button type="submit" class="btn btn-80-primary" aria-label="Gửi nhu cầu">' + icon('arrow_upward') + '</button></form>',
        '</section>',
        '<aside class="assistant-context-panel">',
          '<section class="assistant-context-card card-80"><span class="assistant-preview-label">Nhu cầu hiện tại</span><strong id="assistantCriteriaSummary">' + summary + '</strong><div class="assistant-context-tags" id="assistantContextTags">' +
            (savedState.q ? '<span>' + icon('location_on') + ' ' + savedState.q + '</span>' : '') +
            (savedState.price !== 'all' ? '<span>' + icon('payments') + ' ' + (savedState.price === 'under-4' ? 'Dưới 4 triệu' : savedState.price === '4-6' ? '4–6 triệu' : '6–10 triệu') + '</span>' : '') +
            (savedState.type !== 'all' ? '<span>' + icon('category') + ' ' + savedState.type + '</span>' : '') +
            savedState.amenities.map(function (amenity) { return '<span>' + icon('check_circle') + ' ' + amenity + '</span>'; }).join('') +
          '</div><a id="assistantSearchLink" href="' + statePath('/search', savedState) + '" data-link class="btn btn-80-primary w-100 mt-3">' + icon('search') + ' Xem phòng phù hợp (' + results.length + ')</a></section>',
          '<section class="assistant-context-card card-80"><span class="assistant-preview-label">Gợi ý nhanh</span><strong>Nói thêm điều bạn ưu tiên</strong><div class="assistant-tip-list"><span>' + icon('verified') + ' Ưu tiên tin đã xác thực</span><span>' + icon('map') + ' Có thể mở bản đồ sau khi lọc</span><span>' + icon('tune') + ' Bộ lọc vẫn chỉnh được ở trang kết quả</span></div></section>',
          results.length ? '<section class="assistant-context-card card-80"><div class="assistant-result-head"><div><span class="assistant-preview-label">Kết quả xem trước</span><strong>Phòng khớp nhu cầu</strong></div><span class="assistant-match-count">' + results.length + ' tin</span></div><div class="assistant-result-list">' + resultCards + '</div></section>' : '',
        '</aside>',
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
  return '<main class="page-content page-content-mobile"><div class="container-xl"><section class="page-hero"><a href="/provinces" data-link class="text-80-muted small">← Khu vực</a><h1 class="mt-2">Tìm phòng tại ' + province.name + '</h1><p>' + province.count + ' tin mẫu · ' + province.districts.slice(0,3).join(' · ') + '</p></section><div class="card-80 p-4 mb-3"><h2 class="h5">Khu vực nổi bật</h2><div class="d-flex flex-wrap gap-2">' + province.districts.map(function (district) { return '<span class="quick-pill">' + district + '</span>'; }).join('') + '</div><a href="/search" data-link class="btn btn-80-primary mt-3">Xem phòng</a></div><div class="row g-3">' + listings.slice(0,2).map(function (item) { return '<div class="col-6"><a href="' + detailHref(item.id) + '" data-link class="text-dark text-decoration-none">' + propertyCard(item) + '</a></div>'; }).join('') + '</div><div class="card-80 p-3 mt-3"><h2 class="h5">Tìm quanh khu vực</h2><div class="split-map mt-2" style="min-height:260px"><span class="map-pin" style="left:45%;top:43%"></span></div><a href="/map" data-link class="btn btn-outline-secondary w-100 mt-2">Mở bản đồ</a></div></div></main>';
}

function landlordRecords() {
  const base = [
    {id:'1', listingId:1, title:'Studio Bình Thạnh', price:'4,2 triệu', area:'28 m²', location:'Bình Thạnh, TP.HCM', views:'428', leads:'16', status:'active', updated:'Hôm nay 09:24'},
    {id:'2', listingId:2, title:'Phòng gác Thủ Đức', price:'3,8 triệu', area:'24 m²', location:'Thủ Đức, TP.HCM', views:'315', leads:'9', status:'active', updated:'Hôm qua 18:20'},
    {id:'3', listingId:3, title:'Căn hộ Quận 7', price:'5,0 triệu', area:'35 m²', location:'Quận 7, TP.HCM', views:'182', leads:'4', status:'pending', updated:'Hôm qua 11:04'}
  ];
  let extra = [];
  try { extra = JSON.parse(localStorage.getItem('80land:landlord:records') || '[]'); } catch (error) {}
  const customIds = Array.isArray(extra) ? extra.map(function (item) { return String(item.id); }) : [];
  return base.filter(function (item) { return customIds.indexOf(String(item.id)) === -1; }).concat(Array.isArray(extra) ? extra : []).map(function (item) {
    const override = localStorage.getItem('80landlord:status:' + item.id);
    return override ? Object.assign({}, item, { status: override }) : item;
  });
}

function landlordMoneyNumber(value) {
  const raw = String(value || '').toLowerCase().trim();
  const million = raw.match(/(\d+(?:[\.,]\d+)?)\s*triệu/);
  if (million) return String(Math.round(Number(million[1].replace(',', '.')) * 1000000));
  return raw.replace(/\D/g,'');
}

function landlordDraft(id) {
  const defaults = {
    id: id || '',
    type:'Phòng trọ',
    title:'Studio full nội thất, cửa sổ lớn',
    price:'4200000',
    area:'28',
    term:'Cho thuê dài hạn',
    description:'Phòng sạch, thoáng, đầy đủ nội thất cơ bản. Có chỗ để xe và giờ giấc tự do.',
    amenities:['WC riêng','Máy lạnh','Ban công'],
    province:'TP. Hồ Chí Minh',
    district:'Bình Thạnh',
    address:'Đường Điện Biên Phủ, Bình Thạnh',
    lat:'10.8020',
    lng:'106.7145',
    photoNames:[]
  };
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem('80land:landlord:draft') || 'null'); } catch (error) {}
  const record = (id ? landlordRecords().find(function (item) { return String(item.id) === String(id); }) : null);
  const linked = record ? listings.find(function (item) { return item.id === record.listingId; }) : null;
  const fromRecord = record ? {
    id:record.id,
    type:linked ? listingType(linked) : defaults.type,
    title:record.title,
    price:landlordMoneyNumber(record.price),
    area:record.area.replace(/\D/g,''),
    term:'Cho thuê dài hạn',
    description:linked ? 'Phòng sạch, thoáng, đầy đủ nội thất cơ bản. Có chỗ để xe và giờ giấc tự do.' : defaults.description,
    amenities:linked ? linked.features.slice() : defaults.amenities.slice(),
    province:'TP. Hồ Chí Minh',
    district:record.location.split(',')[0],
    address:record.location,
    lat:defaults.lat,
    lng:defaults.lng,
    photoNames:[]
  } : {};
  return Object.assign({}, defaults, stored || {}, fromRecord, id ? {id:id} : {});
}

function formatLandlordPrice(value) {
  const number = Number(String(value || '').replace(/\D/g,''));
  return number ? number.toLocaleString('vi-VN') : '0';
}

function landlordStatusLabel(status) {
  return status === 'active' ? 'Đang hiển thị' :
    status === 'pending' ? 'Chờ duyệt' :
    status === 'paused' ? 'Đã tạm ẩn' :
    status === 'draft' ? 'Bản nháp' : 'Đã hết hạn';
}

function landlordStatusClass(status) {
  return status === 'active' ? 'success' :
    status === 'pending' ? 'warning' :
    status === 'paused' ? 'muted' :
    status === 'draft' ? 'draft' : 'danger';
}

function landlordPage() {
  const records = landlordRecords();
  const active = records.filter(function (item) { return item.status === 'active'; }).length;
  const pending = records.filter(function (item) { return item.status === 'pending'; }).length;
  const drafts = records.filter(function (item) { return item.status === 'draft'; }).length;
  const totalViews = records.reduce(function (sum, item) { return sum + Number(String(item.views).replace(/\D/g,'')); }, 0);
  const statusTabs = [
    ['all','Tất cả',records.length],
    ['active','Đang hiển thị',active],
    ['pending','Chờ duyệt',pending],
    ['draft','Bản nháp',drafts],
    ['paused','Đã tạm ẩn',records.filter(function (item){return item.status==='paused';}).length]
  ];
  return [
    '<main class="page-content page-content-mobile landlord-page"><div class="container-xl">',
      '<section class="landlord-dashboard-head"><div><span class="assistant-kicker">' + icon('storefront') + ' LANDLORD CENTER</span><h1>Quản lý tin cho thuê</h1><p>Theo dõi hiệu quả, cập nhật tin và kiểm soát trạng thái hiển thị từ một nơi.</p></div><a href="/landlord/new" data-link class="btn btn-80-primary">' + icon('add') + ' Tạo tin mới</a></section>',
      '<div class="landlord-stat-grid">',
        '<div class="card-80 landlord-stat-card"><span class="landlord-stat-icon">' + icon('visibility') + '</span><div><strong>' + active + '</strong><small>Tin đang hiển thị</small></div></div>',
        '<div class="card-80 landlord-stat-card"><span class="landlord-stat-icon">' + icon('analytics') + '</span><div><strong>' + totalViews.toLocaleString('vi-VN') + '</strong><small>Lượt xem</small></div></div>',
        '<div class="card-80 landlord-stat-card"><span class="landlord-stat-icon">' + icon('favorite') + '</span><div><strong>' + records.reduce(function(s,i){return s+Number(i.leads||0)},0) + '</strong><small>Khách quan tâm</small></div></div>',
        '<div class="card-80 landlord-stat-card"><span class="landlord-stat-icon">' + icon('pending_actions') + '</span><div><strong>' + pending + '</strong><small>Đang chờ duyệt</small></div></div>',
      '</div>',
      '<section class="landlord-workspace">',
        '<div class="card-80 landlord-list-card">',
          '<div class="landlord-section-head"><div><h2>Tin đăng của bạn</h2><p>Chọn trạng thái để tập trung vào những tin cần xử lý.</p></div><a href="/landlord/new" data-link class="btn btn-sm btn-80-outline">' + icon('add') + ' Đăng tin</a></div>',
          '<div class="landlord-filter-tabs" id="landlordFilterTabs">' + statusTabs.map(function(tab,index){
            return '<button type="button" class="' + (index===0?'active':'') + '" data-landlord-filter="' + tab[0] + '">' + tab[1] + '<span>' + tab[2] + '</span></button>';
          }).join('') + '</div>',
          '<div class="landlord-list landlord-managed-list" id="landlordManagedList">' + records.map(function(item){
            const listing = listings.find(function(entry){return entry.id===item.listingId;}) || listings[0];
            const actionLabel = item.status === 'active' ? 'Tạm ẩn' : item.status === 'paused' ? 'Hiển thị lại' : item.status === 'pending' ? 'Xem tình trạng' : 'Tiếp tục';
            return '<article class="landlord-list-row landlord-managed-row" data-landlord-row data-status="' + item.status + '">' +
              '<div class="landlord-thumb" style="background-image:url(' + JSON.stringify(listing.image) + ')"></div>' +
              '<div class="landlord-row-copy"><strong>' + item.title + '</strong><span>' + item.price + '/tháng · ' + item.area + ' · ' + item.location + '</span><small>' + item.views + ' lượt xem · ' + item.leads + ' khách quan tâm · ' + item.updated + '</small></div>' +
              '<span class="status-pill ' + landlordStatusClass(item.status) + '">' + landlordStatusLabel(item.status) + '</span>' +
              '<div class="landlord-row-actions"><a href="/landlord/preview/' + item.id + '" data-link class="icon-button" data-tooltip="Xem trước">' + icon('visibility') + '</a><a href="/landlord/edit/' + item.id + '" data-link class="icon-button" data-tooltip="Chỉnh sửa">' + icon('edit') + '</a><button type="button" class="icon-button" data-landlord-toggle="' + item.id + '" data-landlord-toggle-label="' + actionLabel + '" data-tooltip="' + actionLabel + '">' + icon(item.status === 'active' ? 'visibility_off' : 'more_horiz') + '</button></div>' +
            '</article>';
          }).join('') + '</div>',
        '</div>',
        '<aside class="landlord-side-column">',
          '<section class="card-80 landlord-side-card landlord-health-card"><span class="assistant-kicker">' + icon('tips_and_updates') + ' TÌNH TRẠNG TIN</span><h2>Độ hoàn thiện trung bình</h2><div class="listing-quality-meter"><div><strong>82%</strong><span>Đủ thông tin để hiển thị tốt</span></div><i><em style="width:82%"></em></i></div><div class="landlord-checklist"><span>✓ Tiêu đề và giá đã rõ ràng</span><span>✓ Đã có vị trí bản đồ</span><span>✓ Có ảnh phòng chính</span><span>+ Thêm video để tăng độ tin cậy</span></div><a href="/landlord/new" data-link class="btn btn-80-primary w-100">Hoàn thiện tin</a></section>',
          '<section class="card-80 landlord-side-card"><span class="assistant-kicker">' + icon('schedule') + ' HOẠT ĐỘNG GẦN ĐÂY</span><div class="landlord-activity-list"><span><i></i><div><strong>Tin #80L-1042 được cập nhật</strong><small>Hôm nay, 09:24</small></div></span><span><i></i><div><strong>Có 2 khách lưu tin</strong><small>Hôm qua, 18:20</small></div></span><span><i></i><div><strong>Tin #80L-1044 đang chờ duyệt</strong><small>Hôm qua, 11:04</small></div></span></div></section>',
        '</aside>',
      '</section>',
    '</div></main>'
  ].join('');
}

function landlordCreatePage(mode, id) {
  const editMode = mode === 'edit';
  const draft = landlordDraft(id);
  const title = editMode ? 'Chỉnh sửa tin cho thuê' : 'Tạo tin cho thuê';
  return [
    '<main class="page-content page-content-mobile landlord-create-page"><div class="container-xl">',
      '<section class="page-hero"><a href="/landlord" data-link class="text-80-muted small">' + icon('arrow_back') + ' Quản lý tin</a><h1 class="mt-2">' + title + '</h1><p>Tạo tin theo 4 bước. Nội dung được lưu thành bản nháp để bạn không mất công sức khi quay lại.</p></section>',
      '<div class="listing-create-layout phase7-create-layout">',
        '<section class="card-80 listing-stepper" id="landlordStepper">',
          '<button type="button" class="listing-step active" data-landlord-step="1"><span>1</span><div><strong>Thông tin cơ bản</strong><small>Loại hình, giá, tiêu đề</small></div></button>',
          '<button type="button" class="listing-step" data-landlord-step="2"><span>2</span><div><strong>Ảnh & tiện ích</strong><small>Nội dung nổi bật</small></div></button>',
          '<button type="button" class="listing-step" data-landlord-step="3"><span>3</span><div><strong>Vị trí</strong><small>Khu vực và địa chỉ</small></div></button>',
          '<button type="button" class="listing-step" data-landlord-step="4"><span>4</span><div><strong>Xem trước</strong><small>Kiểm tra trước khi đăng</small></div></button>',
          '<div class="listing-progress"><span id="listingProgressLabel">25% hoàn thành</span><div><i id="listingProgressBar" style="width:25%"></i></div></div>',
        '</section>',
        '<section class="card-80 listing-form-card phase7-form-card">',
          '<div class="listing-form-head"><div><span class="assistant-kicker" id="listingStepKicker">Bước 1</span><h2 id="listingStepTitle">Thông tin cơ bản</h2><p id="listingStepDescription">Những thông tin người tìm phòng cần nhìn thấy trước tiên.</p></div><span class="required-note">* Bắt buộc</span></div>',

          '<div class="landlord-step-panel is-active" data-landlord-panel="1">',
            '<div class="listing-form-grid">',
              '<label class="form-field"><span>Loại hình *</span><select id="listingType"><option' + (draft.type==='Phòng trọ'?' selected':'') + '>Phòng trọ</option><option' + (draft.type==='Chung cư'?' selected':'') + '>Chung cư</option><option>Nhà nguyên căn</option><option>Căn hộ dịch vụ</option></select></label>',
              '<label class="form-field"><span>Giá thuê / tháng *</span><input id="listingPrice" inputmode="numeric" value="' + draft.price + '"></label>',
              '<label class="form-field full"><span>Tiêu đề tin *</span><input id="listingTitle" value="' + draft.title.replace(/"/g,'&quot;') + '" placeholder="Ví dụ: Studio full nội thất gần Đại học"></label>',
              '<label class="form-field"><span>Diện tích *</span><input id="listingArea" inputmode="numeric" value="' + draft.area + '"></label>',
              '<label class="form-field"><span>Hình thức</span><select id="listingTerm"><option' + (draft.term==='Cho thuê dài hạn'?' selected':'') + '>Cho thuê dài hạn</option><option' + (draft.term==='Ngắn hạn'?' selected':'') + '>Ngắn hạn</option></select></label>',
              '<label class="form-field full"><span>Mô tả *</span><textarea id="listingDescription" rows="6" placeholder="Mô tả tình trạng phòng, quy định, chi phí và thời gian vào ở...">' + draft.description + '</textarea></label>',
            '</div>',
            '<div class="listing-validation-hint" id="listingBasicHint">' + icon('info') + ' Điền đủ loại hình, tiêu đề, giá và diện tích trước khi sang bước tiếp theo.</div>',
          '</div>',

          '<div class="landlord-step-panel" data-landlord-panel="2">',
            '<div class="listing-photo-drop phase7-photo-drop"><div class="listing-photo-icon">' + icon('add_photo_alternate') + '</div><div><strong>Thêm ảnh phòng</strong><p>Chọn nhiều ảnh để tạo bộ ảnh cho tin đăng.</p></div><label class="btn btn-80-outline" for="landlordPhotoInput">Chọn ảnh<input id="landlordPhotoInput" type="file" accept="image/*" multiple hidden></label></div>',
            '<div class="phase7-photo-preview" id="landlordPhotoPreview"><div class="phase7-photo-placeholder">' + icon('photo_library') + '<span>Ảnh bạn chọn sẽ xuất hiện ở đây.</span></div></div>',
            '<div class="landlord-amenity-select"><div><span class="detail-overline">Tiện ích</span><h3>Chọn những điểm nổi bật</h3></div><div class="landlord-amenity-grid">' +
              ['WC riêng','Máy lạnh','Ban công','Gác','Không chung chủ','Có chỗ để xe','Thang máy','Giờ tự do'].map(function(amenity){return '<button type="button" class="landlord-amenity-choice' + (draft.amenities.indexOf(amenity)>-1?' active':'') + '" data-landlord-amenity="' + amenity + '">' + icon(draft.amenities.indexOf(amenity)>-1?'check_circle':'add_circle') + '<span>' + amenity + '</span></button>';}).join('') +
            '</div></div>',
          '</div>',

          '<div class="landlord-step-panel" data-landlord-panel="3">',
            '<div class="listing-form-grid">',
              '<label class="form-field"><span>Tỉnh / thành *</span><select id="listingProvince"><option' + (draft.province==='TP. Hồ Chí Minh'?' selected':'') + '>TP. Hồ Chí Minh</option><option' + (draft.province==='Đồng Nai'?' selected':'') + '>Đồng Nai</option><option>Bình Dương</option><option>Đà Nẵng</option><option>Hà Nội</option></select></label>',
              '<label class="form-field"><span>Quận / huyện *</span><input id="listingDistrict" value="' + draft.district.replace(/"/g,'&quot;') + '"></label>',
              '<label class="form-field full"><span>Địa chỉ hiển thị *</span><input id="listingAddress" value="' + draft.address.replace(/"/g,'&quot;') + '"></label>',
              '<label class="form-field"><span>Vĩ độ</span><input id="listingLat" value="' + draft.lat + '"></label>',
              '<label class="form-field"><span>Kinh độ</span><input id="listingLng" value="' + draft.lng + '"></label>',
            '</div>',
            '<div class="phase7-location-card"><div class="phase7-location-map"><span class="phase7-location-pin">' + icon('location_on') + '</span><span class="phase7-location-label">' + draft.district + '</span></div><div><span class="detail-overline">Vị trí hiển thị</span><strong>Chỉ hiển thị ở mức khu vực</strong><p>Không cần công khai số nhà chính xác trong tin mẫu.</p></div></div>',
          '</div>',

          '<div class="landlord-step-panel" data-landlord-panel="4">',
            '<div class="phase7-review-grid"><div><span class="detail-overline">Xem trước</span><h3 id="listingPreviewTitle">' + draft.title + '</h3><div class="property-price" id="listingPreviewPrice">' + formatLandlordPrice(draft.price) + 'đ/tháng</div><p id="listingPreviewLocation">' + draft.district + ', ' + draft.province + ' · ' + draft.area + ' m²</p><div class="d-flex flex-wrap gap-1" id="listingPreviewAmenities">' + draft.amenities.map(function(a){return '<span class="quick-pill">' + a + '</span>';}).join('') + '</div></div><div class="phase7-review-status"><span>' + icon('verified') + ' Sẵn sàng kiểm tra</span><small>Tin sẽ chuyển sang trạng thái chờ duyệt khi bạn đăng.</small></div></div>',
            '<div class="phase7-review-checklist"><div>' + icon('check_circle') + '<span>Thông tin cơ bản</span><b>Đủ</b></div><div>' + icon('check_circle') + '<span>Tiện ích & ảnh</span><b id="reviewMediaStatus">Đang cập nhật</b></div><div>' + icon('check_circle') + '<span>Vị trí</span><b id="reviewLocationStatus">Đủ</b></div></div>',
          '</div>',

          '<div class="listing-form-actions phase7-form-actions"><button class="btn btn-80-outline" type="button" id="listingBackStep">' + icon('arrow_back') + ' Quay lại</button><button class="btn btn-80-outline" type="button" id="listingSaveDraft">' + icon('save') + ' Lưu nháp</button><button class="btn btn-80-primary" type="button" id="listingNextStep">Tiếp tục ' + icon('arrow_forward') + '</button><button class="btn btn-80-primary" type="button" id="listingPublish" hidden>' + icon('publish') + ' Đăng tin</button></div>',
        '</section>',
        '<aside class="card-80 listing-preview-card phase7-live-preview"><span class="assistant-kicker">' + icon('visibility') + ' LIVE PREVIEW</span><div class="preview-media" id="listingLiveImage" style="background-image:url(' + JSON.stringify(listings[0].image) + ')"><span class="status-pill success" id="listingLiveStatus">Xem trước</span></div><div class="p-3"><div class="property-price" id="listingLivePrice">' + formatLandlordPrice(draft.price) + 'đ/tháng</div><strong id="listingLiveTitle">' + draft.title + '</strong><div class="property-meta" id="listingLiveMeta">' + draft.district + ', ' + draft.province + ' · ' + draft.area + ' m²</div><div class="d-flex flex-wrap gap-1 mt-2" id="listingLiveFeatures">' + draft.amenities.slice(0,3).map(function(a){return '<span class="quick-pill">' + a + '</span>';}).join('') + '</div></div></aside>',
      '</div>',
    '</div></main>'
  ].join('');
}

function landlordPreviewPage(id) {
  const record = landlordRecords().find(function (item) { return String(item.id) === String(id); }) || landlordRecords()[0];
  const listing = listings.find(function (item) { return item.id === record.listingId; }) || listings[0];
  return [
    '<main class="page-content page-content-mobile landlord-preview-page"><div class="container-xl">',
      '<section class="page-hero"><a href="/landlord" data-link class="text-80-muted small">' + icon('arrow_back') + ' Quản lý tin</a><h1 class="mt-2">Xem trước tin đăng</h1><p>Đây là cách nội dung sẽ được trình bày trong luồng marketplace của 80Land.</p></section>',
      '<div class="landlord-preview-shell">',
        '<div class="landlord-preview-image"><img src="' + listing.image + '" alt="' + record.title.replace(/"/g,'&quot;') + '"><span class="status-pill ' + landlordStatusClass(record.status) + '">' + landlordStatusLabel(record.status) + '</span></div>',
        '<section class="card-80 landlord-preview-content"><span class="assistant-kicker">' + icon('visibility') + ' PREVIEW</span><h2>' + record.title + '</h2><div class="property-price">' + record.price + '/tháng</div><p class="landlord-preview-location">' + icon('location_on') + ' ' + record.location + ' · ' + record.area + '</p><div class="detail-feature-pills">' + listing.features.map(function(f){return '<span><i>' + icon('check_circle') + '</i>' + f + '</span>';}).join('') + '</div><div class="landlord-preview-description"><span class="detail-overline">Mô tả</span><p>Phòng sạch, thoáng, đầy đủ nội thất cơ bản. Tin mẫu hiển thị các thông tin quan trọng trước, sau đó mở rộng sang chi tiết và vị trí.</p></div><div class="landlord-preview-actions"><a href="/landlord/edit/' + record.id + '" data-link class="btn btn-80-primary">' + icon('edit') + ' Chỉnh sửa</a><a href="/property/' + listing.id + '" data-link class="btn btn-80-outline">' + icon('open_in_new') + ' Xem như người thuê</a></div></section>',
      '</div>',
    '</div></main>'
  ].join('');
}


function walletReadState() {
  const defaults = { balance: 2480000, withdrawable: 1820000, pending: 660000, commission: 1820000 };
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem('80land:wallet') || 'null'); } catch (error) {}
  return Object.assign({}, defaults, stored || {});
}

function walletTransactions() {
  const defaults = [
    { id:'tx-1', date:'25/09/2026', title:'Hoa hồng giới thiệu', note:'1 lượt giới thiệu đủ điều kiện', amount:300000, type:'credit', status:'completed' },
    { id:'tx-2', date:'22/09/2026', title:'Thưởng hoàn thành giao dịch', note:'Tin đăng được xác nhận hoàn tất', amount:450000, type:'credit', status:'completed' },
    { id:'tx-3', date:'18/09/2026', title:'Yêu cầu rút tiền', note:'Vietcombank · **** 2388', amount:-500000, type:'debit', status:'pending' }
  ];
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem('80land:wallet:transactions') || 'null'); } catch (error) {}
  return Array.isArray(stored) ? stored : defaults;
}

function saveWalletState(state) {
  localStorage.setItem('80land:wallet', JSON.stringify(state));
}

function walletFormat(value) {
  return Number(value || 0).toLocaleString('vi-VN') + 'đ';
}

function referralReadState() {
  const defaults = {
    code:'80LAND-QT2026',
    link:'https://80landtimphong.vn/r/80LAND-QT2026',
    invited:18,
    qualified:7,
    earned:2400000,
    last7:3
  };
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem('80land:referrals') || 'null'); } catch (error) {}
  return Object.assign({}, defaults, stored || {});
}

function earningsReadState() {
  const defaults = {
    month:3420000,
    total:8760000,
    commission:1820000,
    referral:1600000,
    listing:0,
    pending:660000
  };
  let stored = null;
  try { stored = JSON.parse(localStorage.getItem('80land:earnings') || 'null'); } catch (error) {}
  return Object.assign({}, defaults, stored || {});
}

function walletPage() {
  const wallet = walletReadState();
  const transactions = walletTransactions();
  const recent = transactions.slice(0,5).map(function (tx) {
    const positive = tx.type === 'credit' || tx.amount > 0;
    const status = tx.status === 'pending' ? '<span class="wallet-tx-status pending">Đang xử lý</span>' : '<span class="wallet-tx-status done">Hoàn tất</span>';
    return '<article class="wallet-transaction"><span class="wallet-tx-icon ' + (positive ? 'credit' : 'debit') + '">' + icon(positive ? 'south_west' : 'north_east') + '</span><div><strong>' + tx.title + '</strong><small>' + tx.date + ' · ' + tx.note + '</small></div><div class="wallet-tx-amount ' + (positive ? 'credit' : 'debit') + '">' + (positive ? '+' : '') + walletFormat(Math.abs(tx.amount)) + status + '</div></article>';
  }).join('');
  return [
    '<main class="page-content page-content-mobile wallet-page"><div class="container-xl">',
      '<section class="phase8-head"><div><span class="assistant-kicker">' + icon('account_balance_wallet') + ' 80LAND WALLET</span><h1>Ví & thu nhập</h1><p>Theo dõi số dư, hoa hồng và các yêu cầu rút tiền trong một màn hình.</p></div><span class="phase8-demo-badge">' + icon('science') + ' Prototype UI</span></section>',
      '<section class="wallet-hero-grid">',
        '<article class="wallet-balance-card"><div class="wallet-balance-top"><span>Số dư ví</span><span class="wallet-mini-badge">' + icon('verified_user') + ' Đang đồng bộ</span></div><strong>' + walletFormat(wallet.balance) + '</strong><div class="wallet-balance-meta"><span>Có thể rút <b>' + walletFormat(wallet.withdrawable) + '</b></span><span>Đang chờ <b>' + walletFormat(wallet.pending) + '</b></span></div><div class="wallet-actions"><a href="#walletWithdraw" class="btn btn-light" data-wallet-jump>' + icon('south_east') + ' Rút tiền</a><a href="/earnings" data-link class="btn btn-80-outline light-border">' + icon('monitoring') + ' Xem thu nhập</a></div></article>',
        '<div class="wallet-summary-grid"><div class="card-80 wallet-summary-card"><span>' + icon('payments') + '</span><strong>' + walletFormat(wallet.commission) + '</strong><small>Hoa hồng khả dụng</small></div><div class="card-80 wallet-summary-card"><span>' + icon('group_add') + '</span><strong>' + walletFormat(referralReadState().earned) + '</strong><small>Thu nhập giới thiệu</small></div></div>',
      '</section>',
      '<section class="wallet-content-grid">',
        '<div class="card-80 wallet-panel"><div class="wallet-panel-head"><div><span class="detail-overline">Lịch sử</span><h2>Giao dịch gần đây</h2></div><span class="phase8-soft-badge">' + transactions.length + ' giao dịch</span></div><div class="wallet-transaction-list">' + recent + '</div><a href="#walletAllTransactions" class="wallet-text-link" data-wallet-show-all>' + icon('receipt_long') + ' Xem toàn bộ giao dịch</a><div id="walletAllTransactions" class="wallet-all-transactions" hidden>' + transactions.map(function (tx) { const positive=tx.amount>0; return '<div class="wallet-mini-row"><span>' + tx.date + '</span><strong>' + tx.title + '</strong><b class="' + (positive?'credit':'debit') + '">' + (positive?'+':'') + walletFormat(Math.abs(tx.amount)) + '</b></div>'; }).join('') + '</div></div>',
        '<aside class="wallet-side-stack"><section class="card-80 wallet-panel" id="walletWithdraw"><div class="wallet-panel-head"><div><span class="detail-overline">Rút tiền</span><h2>Tạo yêu cầu</h2></div></div><p class="wallet-panel-note">Trong prototype, yêu cầu sẽ chuyển thành trạng thái “Đang xử lý” để mô phỏng luồng backend.</p><form id="walletWithdrawForm" class="wallet-withdraw-form"><label><span>Số tiền</span><input id="walletWithdrawAmount" type="number" min="100000" step="10000" placeholder="Nhập số tiền"></label><label><span>Ngân hàng</span><select id="walletWithdrawBank"><option>Vietcombank</option><option>Techcombank</option><option>MB Bank</option><option>ACB</option></select></label><label><span>Số tài khoản</span><input id="walletWithdrawAccount" inputmode="numeric" placeholder="Ví dụ: 0123456789"></label><label><span>Chủ tài khoản</span><input id="walletWithdrawName" value="QUANG TUẤN"></label><button type="submit" class="btn btn-80-primary w-100">' + icon('send_money') + ' Gửi yêu cầu rút</button></form><small class="wallet-form-hint">Khả dụng tối đa: <b>' + walletFormat(wallet.withdrawable) + '</b></small></section>',
        '<section class="card-80 wallet-panel"><span class="detail-overline">Lối tắt</span><div class="wallet-quick-links"><a href="/referrals" data-link><span>' + icon('share') + '</span><div><strong>Giới thiệu bạn bè</strong><small>Mã giới thiệu và thống kê</small></div>' + icon('arrow_forward') + '</a><a href="/landlord" data-link><span>' + icon('storefront') + '</span><div><strong>Quản lý tin</strong><small>Đăng và theo dõi hiệu quả</small></div>' + icon('arrow_forward') + '</a></div></section></aside>',
      '</section>',
    '</div></main>'
  ].join('');
}

function earningsPage() {
  const earnings = earningsReadState();
  const referral = referralReadState();
  const months = [['Tháng 9',72],['Tháng 8',58],['Tháng 7',44],['Tháng 6',31]];
  return [
    '<main class="page-content page-content-mobile wallet-page"><div class="container-xl">',
      '<section class="phase8-head"><div><span class="assistant-kicker">' + icon('monitoring') + ' EARNINGS</span><h1>Thu nhập</h1><p>Tách nguồn thu để dễ theo dõi hiệu quả theo từng hoạt động.</p></div><a href="/wallet" data-link class="btn btn-80-outline">' + icon('account_balance_wallet') + ' Về ví</a></section>',
      '<section class="earnings-stat-grid"><div class="card-80 earnings-stat"><span class="detail-overline">Tháng này</span><strong>' + walletFormat(earnings.month) + '</strong><small>+18% so với tháng trước · dữ liệu demo</small></div><div class="card-80 earnings-stat"><span class="detail-overline">Lũy kế</span><strong>' + walletFormat(earnings.total) + '</strong><small>Tổng thu nhập mô phỏng</small></div><div class="card-80 earnings-stat"><span class="detail-overline">Hoa hồng</span><strong>' + walletFormat(earnings.commission) + '</strong><small>Đến từ hoạt động giới thiệu</small></div><div class="card-80 earnings-stat"><span class="detail-overline">Đang chờ</span><strong>' + walletFormat(earnings.pending) + '</strong><small>Chưa thể rút ở thời điểm này</small></div></section>',
      '<section class="earnings-work-grid"><div class="card-80 earnings-chart-card"><div class="wallet-panel-head"><div><span class="detail-overline">Xu hướng</span><h2>Hiệu quả theo tháng</h2></div><span class="phase8-demo-badge small">Demo</span></div><div class="earnings-bars">' + months.map(function(item){return '<div class="earnings-bar-item"><div class="earnings-bar-track"><i style="height:' + item[1] + '%"></i></div><strong>' + item[0] + '</strong></div>';}).join('') + '</div></div>',
        '<aside class="card-80 earnings-source-card"><div class="wallet-panel-head"><div><span class="detail-overline">Nguồn thu</span><h2>Đóng góp vào tháng này</h2></div></div><div class="earnings-source"><span><i class="wallet-source-dot red"></i> Hoa hồng giới thiệu</span><b>' + walletFormat(earnings.referral) + '</b></div><div class="earnings-source"><span><i class="wallet-source-dot dark"></i> Hoa hồng tin đăng</span><b>' + walletFormat(earnings.listing) + '</b></div><div class="earnings-source"><span><i class="wallet-source-dot soft"></i> Khác</span><b>' + walletFormat(Math.max(0, earnings.month - earnings.referral - earnings.listing)) + '</b></div><div class="earnings-rule-note">' + icon('info') + '<span>Các con số trên là dữ liệu trình diễn cho UI. Luật hoa hồng thật cần được backend và admin cấu hình.</span></div></aside></section>',
      '<section class="card-80 earnings-opportunity"><div><span class="assistant-kicker">' + icon('group_add') + ' REFERRAL</span><h2>Tăng thu nhập từ giới thiệu</h2><p>' + referral.invited + ' lượt mời · ' + referral.qualified + ' lượt đủ điều kiện trong dữ liệu demo hiện tại.</p></div><a href="/referrals" data-link class="btn btn-80-primary">' + icon('share') + ' Mở chương trình giới thiệu</a></section>',
    '</div></main>'
  ].join('');
}

function referralsPage() {
  const referral = referralReadState();
  const referredUsers = [
    ['Nguyễn A.','Đã tham gia','2 ngày trước'],
    ['Trần B.','Đang xác minh','5 ngày trước'],
    ['Lê C.','Đã tham gia','7 ngày trước'],
    ['Phạm D.','Đã tham gia','12 ngày trước']
  ];
  return [
    '<main class="page-content page-content-mobile wallet-page"><div class="container-xl">',
      '<section class="phase8-head"><div><span class="assistant-kicker">' + icon('group_add') + ' REFERRAL HUB</span><h1>Giới thiệu bạn bè</h1><p>Chia sẻ 80Land và theo dõi trạng thái giới thiệu trong một nơi.</p></div><a href="/wallet" data-link class="btn btn-80-outline">' + icon('account_balance_wallet') + ' Về ví</a></section>',
      '<section class="referral-hero-grid"><article class="referral-code-card"><span class="detail-overline">Mã giới thiệu của bạn</span><strong id="referralCode">' + referral.code + '</strong><div class="referral-link-box"><input id="referralLink" readonly value="' + referral.link + '"><button type="button" id="copyReferralLink" class="icon-button-80" aria-label="Sao chép liên kết">' + icon('content_copy') + '</button></div><div class="referral-action-row"><button type="button" class="btn btn-80-primary" id="copyReferralCode">' + icon('content_copy') + ' Sao chép mã</button><button type="button" class="btn btn-80-outline" id="shareReferral">' + icon('share') + ' Chia sẻ</button></div></article><div class="referral-metrics"><div class="card-80"><span>' + icon('person_add') + '</span><strong>' + referral.invited + '</strong><small>Đã mời</small></div><div class="card-80"><span>' + icon('verified') + '</span><strong>' + referral.qualified + '</strong><small>Đủ điều kiện</small></div><div class="card-80"><span>' + icon('payments') + '</span><strong>' + walletFormat(referral.earned) + '</strong><small>Thu nhập demo</small></div></div></section>',
      '<section class="referral-content-grid"><div class="card-80 wallet-panel"><div class="wallet-panel-head"><div><span class="detail-overline">Người được giới thiệu</span><h2>Trạng thái gần đây</h2></div><span class="phase8-soft-badge">' + referredUsers.length + ' người</span></div><div class="referral-user-list">' + referredUsers.map(function(user,index){return '<div class="referral-user"><span class="referral-user-avatar">' + (index+1) + '</span><div><strong>' + user[0] + '</strong><small>' + user[2] + '</small></div><span class="referral-user-status ' + (user[1]==='Đã tham gia'?'done':'pending') + '">' + user[1] + '</span></div>';}).join('') + '</div></div>',
      '<aside class="card-80 wallet-panel"><div class="wallet-panel-head"><div><span class="detail-overline">Quy tắc chương trình</span><h2>Hiểu trước khi chia sẻ</h2></div></div><div class="referral-rule-list"><div><span>01</span><p>Người mới đăng ký bằng liên kết của bạn.</p></div><div><span>02</span><p>Hệ thống xác minh điều kiện theo backend.</p></div><div><span>03</span><p>Hoa hồng chỉ ghi nhận khi đạt điều kiện.</p></div></div><div class="earnings-rule-note">' + icon('science') + '<span>Đây là luồng UI prototype. Mức thưởng thật chưa được kết nối với backend.</span></div></aside></section>',
      '<section class="card-80 referral-share-banner"><div><span class="assistant-kicker">' + icon('campaign') + ' CHIA SẺ NHANH</span><h2>Gửi liên kết 80Land cho bạn bè</h2><p>Một liên kết, một hành trình tìm phòng. Bạn có thể sao chép hoặc dùng nút chia sẻ của thiết bị.</p></div><button type="button" class="btn btn-80-primary" id="copyReferralLinkBottom">' + icon('content_copy') + ' Sao chép liên kết</button></section>',
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
  else if (path.indexOf('/landlord/edit/') === 0) content = landlordCreatePage('edit', path.split('/')[3]);
  else if (path.indexOf('/landlord/preview/') === 0) content = landlordPreviewPage(path.split('/')[3]);
  else if (path === '/wallet') content = walletPage();
  else if (path === '/earnings') content = earningsPage();
  else if (path === '/referrals') content = referralsPage();
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
      const backdrop = sheet ? document.querySelector('#' + sheet.id + 'Backdrop') : null;
      if (!sheet) return;
      sheet.classList.add('is-open');
      sheet.setAttribute('aria-hidden', 'false');
      if (backdrop) backdrop.classList.add('is-open');
    });
  });

  document.querySelectorAll('[data-filter-option]').forEach(function (option) {
    option.addEventListener('click', function () {
      const group = option.dataset.filterGroup;
      option.parentElement.querySelectorAll('[data-filter-option][data-filter-group="' + group + '"]').forEach(function (item) {
        item.classList.remove('active');
      });
      option.classList.add('active');
    });
  });

  document.querySelectorAll('[data-filter-apply]').forEach(function (button) {
    button.addEventListener('click', function () {
      const sheet = button.closest('.filter-sheet');
      if (!sheet) return;
      const base = sheet.dataset.filterBase || '/search';
      const current = searchState();
      const price = sheet.querySelector('[data-filter-option][data-filter-group="price"].active');
      const type = sheet.querySelector('[data-filter-option][data-filter-group="type"].active');
      const amenities = Array.from(sheet.querySelectorAll('[data-filter-amenity]:checked')).map(function (input) { return input.dataset.filterAmenity; });
      navigate(statePath(base, current, {
        price: price ? price.dataset.filterValue : 'all',
        type: type ? type.dataset.filterValue : 'all',
        amenities: amenities,
        radius: current.radius
      }));
    });
  });

  document.querySelectorAll('[data-filter-reset]').forEach(function (button) {
    button.addEventListener('click', function () {
      const sheet = button.closest('.filter-sheet');
      const base = sheet ? (sheet.dataset.filterBase || '/search') : '/search';
      const current = searchState();
      navigate(statePath(base, current, { price: 'all', type: 'all', amenities: [], radius: current.radius }));
    });
  });

  document.querySelectorAll('[data-filter-close]').forEach(function (element) {
    element.addEventListener('click', function () {
      const sheet = element.closest('.filter-sheet');
      const backdrop = sheet ? document.querySelector('#' + sheet.id + 'Backdrop') : null;
      if (sheet) {
        sheet.classList.remove('is-open');
        sheet.setAttribute('aria-hidden', 'true');
      }
      if (backdrop) backdrop.classList.remove('is-open');
    });
  });

  document.querySelectorAll('.filter-sheet-backdrop').forEach(function (backdrop) {
    backdrop.addEventListener('click', function () {
      const sheet = backdrop.previousElementSibling;
      if (sheet && sheet.classList.contains('filter-sheet')) {
        sheet.classList.remove('is-open');
        sheet.setAttribute('aria-hidden', 'true');
      }
      backdrop.classList.remove('is-open');
    });
  });

  document.querySelectorAll('[data-sort-toggle]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      const menu = document.querySelector('#searchSortMenu');
      if (menu) {
        const open = menu.classList.toggle('is-open');
        menu.setAttribute('aria-hidden', String(!open));
      }
    });
  });

  document.querySelectorAll('[data-sort-value]').forEach(function (button) {
    button.addEventListener('click', function () {
      navigate(statePath(button.dataset.sortBase || '/search', searchState(), { sort: button.dataset.sortValue }));
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
        card.innerHTML = '<div><span class="badge-verified">' + icon('verified') + ' Tin xác thực</span><strong>' + item.title + '</strong><span>' + item.price + '/tháng · ' + item.location + '</span></div><a href="' + detailHref(item.id) + '" data-link>' + icon('arrow_forward') + '</a>';
        card.classList.add('has-selection');
        const link = card.querySelector('[data-link]');
        if (link) link.addEventListener('click', function (navEvent) {
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

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.sort-control')) {
      const menu = document.querySelector('#searchSortMenu');
      if (menu) {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
      }
    }
  });

  document.querySelectorAll('[data-detail-save]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const id = button.dataset.detailSave;
      const key = '80land:saved:' + id;
      const saved = localStorage.getItem(key) === '1';
      const next = !saved;
      localStorage.setItem(key, next ? '1' : '0');
      document.querySelectorAll('[data-detail-save="' + id + '"]').forEach(function (target) {
        target.setAttribute('aria-pressed', String(next));
        target.classList.toggle('is-saved', next);
        target.innerHTML = icon(next ? 'favorite' : 'favorite_border') + '<span>' + (next ? 'Đã lưu' : 'Lưu tin') + '</span>';
      });
    });
    const id = button.dataset.detailSave;
    if (localStorage.getItem('80land:saved:' + id) === '1') {
      button.setAttribute('aria-pressed', 'true');
      button.classList.add('is-saved');
      button.innerHTML = icon('favorite') + '<span>Đã lưu</span>';
    }
  });

  document.querySelectorAll('.gallery-thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      const image = document.querySelector('#detailMainImage');
      if (!image) return;
      image.src = thumb.dataset.gallerySrc;
      document.querySelectorAll('.gallery-thumb').forEach(function (item) { item.classList.remove('active'); });
      thumb.classList.add('active');
    });
  });

  document.querySelectorAll('[data-contact-demo]').forEach(function (button) {
    button.addEventListener('click', function () {
      const notice = document.querySelector('#detailContactNotice');
      if (!notice) return;
      notice.hidden = false;
      button.innerHTML = icon('info') + ' Đang ở chế độ demo';
      button.disabled = true;
    });
  });

  const assistantForm = document.querySelector('#assistantForm');
  const assistantInput = document.querySelector('#assistantInput');
  const assistantBody = document.querySelector('#assistantChatBody');

  function updateAssistantState(text, submitLabel) {
    const base = searchState();
    const nextState = assistantStateFromText(text, base);
    localStorage.setItem('80land:assistant', JSON.stringify(nextState));
    const results = filteredListings(nextState);
    if (assistantBody) {
      const userMessage = document.createElement('div');
      userMessage.className = 'assistant-message assistant-message-user';
      userMessage.innerHTML = '<div class="assistant-user-bubble"></div>';
      userMessage.querySelector('.assistant-user-bubble').textContent = text;
      assistantBody.appendChild(userMessage);

      const assistantMessage = document.createElement('div');
      assistantMessage.className = 'assistant-message assistant-message-ai';
      assistantMessage.innerHTML = '<div class="assistant-bubble-avatar">' + icon('auto_awesome') + '</div><div><p>' + assistantReplyForState(nextState, results) + '</p></div>';
      assistantBody.appendChild(assistantMessage);
      assistantBody.scrollTop = assistantBody.scrollHeight;
    }

    const summary = document.querySelector('#assistantCriteriaSummary');
    const tags = document.querySelector('#assistantContextTags');
    const link = document.querySelector('#assistantSearchLink');
    if (summary) summary.textContent = assistantStateSummary(nextState);
    if (tags) {
      tags.innerHTML =
        (nextState.q ? '<span>' + icon('location_on') + ' ' + nextState.q + '</span>' : '') +
        (nextState.price !== 'all' ? '<span>' + icon('payments') + ' ' + (nextState.price === 'under-4' ? 'Dưới 4 triệu' : nextState.price === '4-6' ? '4–6 triệu' : '6–10 triệu') + '</span>' : '') +
        (nextState.type !== 'all' ? '<span>' + icon('category') + ' ' + nextState.type + '</span>' : '') +
        nextState.amenities.map(function (amenity) { return '<span>' + icon('check_circle') + ' ' + amenity + '</span>'; }).join('');
    }
    if (link) {
      link.href = statePath('/search', nextState);
      link.textContent = 'Xem phòng phù hợp (' + results.length + ')';
      link.insertAdjacentHTML('afterbegin', icon('search') + ' ');
      link.setAttribute('data-link', '');
      link.onclick = function (event) {
        event.preventDefault();
        navigate(statePath('/search', nextState));
      };
    }
    if (assistantInput) assistantInput.value = '';
    return submitLabel || results.length;
  }

  if (assistantForm && assistantInput) {
    assistantForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const value = assistantInput.value.trim();
      if (!value) return;
      updateAssistantState(value);
    });
  }

  document.querySelectorAll('[data-assistant-prompt]').forEach(function (prompt) {
    prompt.addEventListener('click', function () {
      updateAssistantState(prompt.dataset.assistantPrompt);
    });
  });

  const assistantClear = document.querySelector('#assistantClear');
  if (assistantClear) {
    assistantClear.addEventListener('click', function () {
      localStorage.removeItem('80land:assistant');
      navigate('/assistant');
    });
  }

  document.querySelectorAll('[data-saved-remove]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const id = button.dataset.savedRemove;
      localStorage.setItem('80land:saved:' + id, '0');
      const card = document.querySelector('[data-saved-card="' + id + '"]');
      if (card) {
        card.classList.add('is-removing');
        window.setTimeout(function () { card.remove(); updateSavedPageCount(); }, 150);
      }
    });
  });

  function updateSavedPageCount() {
    const count = document.querySelectorAll('[data-saved-card]').length;
    const target = document.querySelector('#savedCount');
    if (target) target.textContent = String(count);
    if (!count) {
      const grid = document.querySelector('#savedGrid');
      if (grid) grid.innerHTML = '<section class="account-empty card-80"><span>' + icon('favorite_border') + '</span><strong>Bạn chưa lưu tin nào</strong><p>Khám phá các phòng phù hợp và lưu lại những tin bạn muốn xem sau.</p><a href="/search" id="savedEmptySearch" class="btn btn-80-primary">Tìm phòng ngay</a></section>';
      const emptySearch = document.querySelector('#savedEmptySearch');
      if (emptySearch) emptySearch.addEventListener('click', function (event) { event.preventDefault(); navigate('/search'); });
    }
  }

  document.querySelectorAll('[data-notification-read]').forEach(function (button) {
    button.addEventListener('click', function () {
      const card = button.closest('[data-notification-card]');
      if (!card) return;
      const readIds = JSON.parse(localStorage.getItem('80land:notifications:read') || '[]');
      const notificationId = Number(card.dataset.notificationCard);
      if (readIds.indexOf(notificationId) === -1) readIds.push(notificationId);
      localStorage.setItem('80land:notifications:read', JSON.stringify(readIds));
      card.classList.remove('is-unread');
      card.dataset.unread = 'false';
      const iconWrap = card.querySelector('.notification-icon');
      if (iconWrap) {
        iconWrap.classList.remove('is-unread');
        iconWrap.innerHTML = icon('notifications_none');
      }
      const topTime = card.querySelector('time');
      if (topTime) topTime.textContent = 'Đã xem';
      button.textContent = 'Đã đọc';
      updateNotificationCount();
    });
  });

  function updateNotificationCount() {
    const count = document.querySelectorAll('[data-notification-card][data-unread="true"]').length;
    const target = document.querySelector('#notificationUnreadCount');
    if (target) target.textContent = String(count);
  }

  document.querySelectorAll('[data-notification-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-notification-filter]').forEach(function (item) { item.classList.remove('active'); });
      button.classList.add('active');
      const filter = button.dataset.notificationFilter;
      document.querySelectorAll('[data-notification-card]').forEach(function (card) {
        card.hidden = filter === 'unread' && card.dataset.unread !== 'true';
      });
    });
  });

  const markAllNotifications = document.querySelector('#markAllNotifications');
  if (markAllNotifications) {
    markAllNotifications.addEventListener('click', function () {
      const allRead = Array.from(document.querySelectorAll('[data-notification-card]')).map(function (card) { return Number(card.dataset.notificationCard); });
      localStorage.setItem('80land:notifications:read', JSON.stringify(allRead));
      document.querySelectorAll('[data-notification-card]').forEach(function (card) {
        card.classList.remove('is-unread');
        card.dataset.unread = 'false';
        const iconWrap = card.querySelector('.notification-icon');
        if (iconWrap) {
          iconWrap.classList.remove('is-unread');
          iconWrap.innerHTML = icon('notifications_none');
        }
        const topTime = card.querySelector('time');
        if (topTime) topTime.textContent = 'Đã xem';
        const toggle = card.querySelector('.notification-read-toggle');
        if (toggle) toggle.textContent = 'Đã đọc';
      });
      updateNotificationCount();
    });
  }

  const profileEditBackdrop = document.querySelector('#profileEditBackdrop');
  const profileEditSheet = document.querySelector('#profileEditSheet');
  const editProfileBtn = document.querySelector('#editProfileBtn');
  const profileEditClose = document.querySelector('#profileEditClose');
  const profileEditCancel = document.querySelector('#profileEditCancel');
  const profileEditSave = document.querySelector('#profileEditSave');
  const profileNameInput = document.querySelector('#profileNameInput');

  function closeProfileEdit() {
    if (!profileEditSheet) return;
    profileEditSheet.classList.remove('is-open');
    profileEditSheet.setAttribute('aria-hidden', 'true');
    if (profileEditBackdrop) profileEditBackdrop.classList.remove('is-open');
  }

  if (editProfileBtn && profileEditSheet) {
    editProfileBtn.addEventListener('click', function () {
      profileEditSheet.classList.add('is-open');
      profileEditSheet.setAttribute('aria-hidden', 'false');
      if (profileEditBackdrop) profileEditBackdrop.classList.add('is-open');
      if (profileNameInput) profileNameInput.focus();
    });
  }
  [profileEditClose, profileEditCancel].forEach(function (button) {
    if (button) button.addEventListener('click', closeProfileEdit);
  });
  if (profileEditBackdrop) profileEditBackdrop.addEventListener('click', closeProfileEdit);

  if (profileEditSave) {
    profileEditSave.addEventListener('click', function () {
      const name = profileNameInput ? profileNameInput.value.trim() : '';
      const city = document.querySelector('#profileCityInput');
      const displayName = name || 'Quang Tuấn';
      const profile = { name: displayName, city: city ? city.value : 'TP. Hồ Chí Minh' };
      localStorage.setItem('80land:profile', JSON.stringify(profile));
      const nameEl = document.querySelector('#profileName');
      if (nameEl) nameEl.textContent = displayName;
      const cityEl = document.querySelector('#profileCity');
      if (cityEl) cityEl.textContent = profile.city;
      const heroName = document.querySelector('.account-profile-hero h1');
      if (heroName) heroName.textContent = displayName;
      const heroCity = document.querySelector('.account-profile-hero p');
      if (heroCity) heroCity.textContent = 'Thành viên từ 2026 · ' + profile.city;
      closeProfileEdit();
    });
  }

  const profilePreferenceSummary = document.querySelector('#profilePreferenceSummary');
  if (profilePreferenceSummary) {
    let pref = null;
    try { pref = JSON.parse(localStorage.getItem('80land:assistant') || 'null'); } catch (error) {}
    if (!pref || (!pref.q && pref.price === 'all' && pref.type === 'all' && !pref.amenities.length)) {
      profilePreferenceSummary.innerHTML = '<div class="account-preference-empty"><span>' + icon('auto_awesome') + '</span><div><strong>Chưa có bộ nhu cầu lưu</strong><p>Mở 80Land Assistant để tạo tiêu chí cá nhân hóa.</p></div><a href="/assistant" data-link>' + icon('arrow_forward') + '</a></div>';
    } else {
      profilePreferenceSummary.innerHTML = '<div class="account-preference-saved"><span>' + icon('auto_awesome') + '</span><div><strong>' + assistantStateSummary(pref) + '</strong><p>Được dùng để tạo gợi ý ở lần tìm tiếp theo.</p></div><a href="' + statePath('/search', pref) + '" data-link>' + icon('search') + '</a></div>';
    }
  }

  document.querySelectorAll('[data-landlord-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-landlord-filter]').forEach(function (item) { item.classList.remove('active'); });
      button.classList.add('active');
      const filter = button.dataset.landlordFilter;
      document.querySelectorAll('[data-landlord-row]').forEach(function (row) {
        row.hidden = filter !== 'all' && row.dataset.status !== filter;
      });
    });
  });

  document.querySelectorAll('[data-landlord-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      const id = button.dataset.landlordToggle;
      const record = landlordRecords().find(function (item) { return String(item.id) === String(id); });
      if (!record) return;
      if (record.status === 'pending') {
        alert('Tin đang chờ hệ thống kiểm duyệt.');
        return;
      }
      const next = record.status === 'active' ? 'paused' : 'active';
      localStorage.setItem('80landlord:status:' + id, next);
      navigate('/landlord');
    });
  });


  const walletAllTransactions = document.querySelector('#walletAllTransactions');
  const walletShowAll = document.querySelector('[data-wallet-show-all]');
  if (walletShowAll && walletAllTransactions) {
    walletShowAll.addEventListener('click', function (event) {
      event.preventDefault();
      const open = walletAllTransactions.hidden;
      walletAllTransactions.hidden = !open;
      walletShowAll.innerHTML = icon(open ? 'expand_less' : 'receipt_long') + (open ? ' Thu gọn giao dịch' : ' Xem toàn bộ giao dịch');
    });
  }

  const walletJump = document.querySelector('[data-wallet-jump]');
  if (walletJump) {
    walletJump.addEventListener('click', function (event) {
      event.preventDefault();
      const target = document.querySelector('#walletWithdraw');
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
      const amount = document.querySelector('#walletWithdrawAmount');
      if (amount) window.setTimeout(function(){ amount.focus(); }, 250);
    });
  }

  const walletWithdrawForm = document.querySelector('#walletWithdrawForm');
  if (walletWithdrawForm) {
    walletWithdrawForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const wallet = walletReadState();
      const amount = Number(document.querySelector('#walletWithdrawAmount')?.value || 0);
      const bank = document.querySelector('#walletWithdrawBank')?.value || '';
      const account = (document.querySelector('#walletWithdrawAccount')?.value || '').trim();
      const name = (document.querySelector('#walletWithdrawName')?.value || '').trim();
      if (!amount || amount < 100000) {
        alert('Số tiền rút tối thiểu trong prototype là 100.000đ.');
        return;
      }
      if (amount > wallet.withdrawable) {
        alert('Số tiền yêu cầu vượt quá số dư có thể rút.');
        return;
      }
      if (!account || !name) {
        alert('Vui lòng điền đầy đủ số tài khoản và tên chủ tài khoản.');
        return;
      }
      const nextWallet = Object.assign({}, wallet, {
        withdrawable: wallet.withdrawable - amount,
        pending: wallet.pending + amount,
        balance: wallet.balance
      });
      saveWalletState(nextWallet);
      const transactions = walletTransactions();
      const nextTransactions = [{
        id:'tx-' + Date.now(),
        date:new Date().toLocaleDateString('vi-VN'),
        title:'Yêu cầu rút tiền',
        note:bank + ' · **** ' + account.slice(-4),
        amount:-amount,
        type:'debit',
        status:'pending'
      }].concat(transactions);
      localStorage.setItem('80land:wallet:transactions', JSON.stringify(nextTransactions));
      const withdrawals = JSON.parse(localStorage.getItem('80land:withdrawals') || '[]');
      withdrawals.unshift({ id:'wd-' + Date.now(), amount:amount, bank:bank, account:'**** ' + account.slice(-4), name:name, status:'pending', createdAt:new Date().toISOString() });
      localStorage.setItem('80land:withdrawals', JSON.stringify(withdrawals));
      alert('Đã tạo yêu cầu rút tiền. Prototype sẽ giữ yêu cầu ở trạng thái đang xử lý.');
      navigate('/wallet');
    });
  }

  function copyPhase8Text(value, successText) {
    if (!value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(function () {
        alert(successText);
      }).catch(function () {
        window.prompt('Sao chép nội dung này:', value);
      });
    } else {
      window.prompt('Sao chép nội dung này:', value);
    }
  }

  const referral = referralReadState();
  const referralCode = document.querySelector('#referralCode');
  const referralLink = document.querySelector('#referralLink');
  const copyReferralLink = document.querySelector('#copyReferralLink');
  const copyReferralLinkBottom = document.querySelector('#copyReferralLinkBottom');
  const copyReferralCode = document.querySelector('#copyReferralCode');
  const shareReferral = document.querySelector('#shareReferral');

  [copyReferralLink, copyReferralLinkBottom].forEach(function (button) {
    if (!button) return;
    button.addEventListener('click', function () {
      copyPhase8Text(referral.link, 'Đã sao chép liên kết giới thiệu.');
    });
  });
  if (copyReferralCode && referralCode) {
    copyReferralCode.addEventListener('click', function () {
      copyPhase8Text(referralCode.textContent.trim(), 'Đã sao chép mã giới thiệu.');
    });
  }
  if (shareReferral) {
    shareReferral.addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({ title:'80Land', text:'Tìm phòng cùng mình trên 80Land', url:referral.link }).catch(function(){});
      } else {
        copyPhase8Text(referral.link, 'Thiết bị chưa hỗ trợ chia sẻ trực tiếp. Đã sao chép liên kết.');
      }
    });
  }
  if (referralLink) referralLink.addEventListener('click', function () { referralLink.select(); });

  let landlordStep = 1;

  function listingFormValues() {
    const selectedAmenities = Array.from(document.querySelectorAll('[data-landlord-amenity].active')).map(function (button) { return button.dataset.landlordAmenity; });
    return {
      id: location.pathname.indexOf('/landlord/edit/') === 0 ? location.pathname.split('/')[3] : '',
      type: document.querySelector('#listingType') ? document.querySelector('#listingType').value : 'Phòng trọ',
      title: document.querySelector('#listingTitle') ? document.querySelector('#listingTitle').value.trim() : '',
      price: document.querySelector('#listingPrice') ? document.querySelector('#listingPrice').value.trim() : '',
      area: document.querySelector('#listingArea') ? document.querySelector('#listingArea').value.trim() : '',
      term: document.querySelector('#listingTerm') ? document.querySelector('#listingTerm').value : 'Cho thuê dài hạn',
      description: document.querySelector('#listingDescription') ? document.querySelector('#listingDescription').value.trim() : '',
      amenities: selectedAmenities,
      province: document.querySelector('#listingProvince') ? document.querySelector('#listingProvince').value : 'TP. Hồ Chí Minh',
      district: document.querySelector('#listingDistrict') ? document.querySelector('#listingDistrict').value.trim() : '',
      address: document.querySelector('#listingAddress') ? document.querySelector('#listingAddress').value.trim() : '',
      lat: document.querySelector('#listingLat') ? document.querySelector('#listingLat').value.trim() : '',
      lng: document.querySelector('#listingLng') ? document.querySelector('#listingLng').value.trim() : '',
      photoNames: Array.from(document.querySelector('#landlordPhotoInput') ? document.querySelector('#landlordPhotoInput').files : []).map(function (file) { return file.name; })
    };
  }

  function updateListingPreview() {
    const value = listingFormValues();
    const title = value.title || 'Tiêu đề tin của bạn';
    const price = value.price ? formatLandlordPrice(value.price) + 'đ/tháng' : '4.200.000đ/tháng';
    const location = (value.district || 'Khu vực') + ', ' + (value.province || 'TP. Hồ Chí Minh') + (value.area ? ' · ' + value.area + ' m²' : '');
    const liveTitle=document.querySelector('#listingLiveTitle'); if(liveTitle) liveTitle.textContent=title;
    const livePrice=document.querySelector('#listingLivePrice'); if(livePrice) livePrice.textContent=price;
    const liveMeta=document.querySelector('#listingLiveMeta'); if(liveMeta) liveMeta.textContent=location;
    const previewTitle=document.querySelector('#listingPreviewTitle'); if(previewTitle) previewTitle.textContent=title;
    const previewPrice=document.querySelector('#listingPreviewPrice'); if(previewPrice) previewPrice.textContent=price;
    const previewLocation=document.querySelector('#listingPreviewLocation'); if(previewLocation) previewLocation.textContent=location;
    const features=document.querySelector('#listingLiveFeatures'); if(features) features.innerHTML=value.amenities.slice(0,3).map(function(a){return '<span class="quick-pill">'+a+'</span>';}).join('');
    const reviewFeatures=document.querySelector('#listingPreviewAmenities'); if(reviewFeatures) reviewFeatures.innerHTML=value.amenities.map(function(a){return '<span class="quick-pill">'+a+'</span>';}).join('');
    const mediaStatus=document.querySelector('#reviewMediaStatus'); if(mediaStatus) mediaStatus.textContent=value.photoNames.length ? value.photoNames.length + ' ảnh' : 'Đang cập nhật';
  }

  function setLandlordStep(step) {
    landlordStep = Math.max(1, Math.min(4, step));
    document.querySelectorAll('[data-landlord-step]').forEach(function (button) {
      button.classList.toggle('active', Number(button.dataset.landlordStep) === landlordStep);
    });
    document.querySelectorAll('[data-landlord-panel]').forEach(function (panel) {
      panel.classList.toggle('is-active', Number(panel.dataset.landlordPanel) === landlordStep);
    });
    const labels=[
      ['Bước 1','Thông tin cơ bản','Những thông tin người tìm phòng cần nhìn thấy trước tiên.'],
      ['Bước 2','Ảnh & tiện ích','Tăng độ tin cậy bằng hình ảnh và các tiện ích nổi bật.'],
      ['Bước 3','Vị trí','Cho biết khu vực và cách tìm đến phòng.'],
      ['Bước 4','Xem trước','Kiểm tra lại nội dung trước khi đăng.']
    ];
    const meta=labels[landlordStep-1];
    const kicker=document.querySelector('#listingStepKicker'); if(kicker) kicker.textContent=meta[0];
    const title=document.querySelector('#listingStepTitle'); if(title) title.textContent=meta[1];
    const desc=document.querySelector('#listingStepDescription'); if(desc) desc.textContent=meta[2];
    const percent=landlordStep*25;
    const label=document.querySelector('#listingProgressLabel'); if(label) label.textContent=percent + '% hoàn thành';
    const bar=document.querySelector('#listingProgressBar'); if(bar) bar.style.width=percent+'%';
    const back=document.querySelector('#listingBackStep'); if(back) back.style.visibility=landlordStep===1?'hidden':'visible';
    const next=document.querySelector('#listingNextStep'); if(next) next.hidden=landlordStep===4;
    const publish=document.querySelector('#listingPublish'); if(publish) publish.hidden=landlordStep!==4;
    updateListingPreview();
  }

  document.querySelectorAll('[data-landlord-step]').forEach(function (button) {
    button.addEventListener('click', function () {
      const target=Number(button.dataset.landlordStep);
      if(target<landlordStep){ setLandlordStep(target); return; }
      if(target===landlordStep+1){ setLandlordStep(target); return; }
      if(target===landlordStep){ return; }
    });
  });

  const landlordNext=document.querySelector('#listingNextStep');
  if(landlordNext) landlordNext.addEventListener('click', function () {
    const value=listingFormValues();
    if(landlordStep===1 && (!value.title || !value.price || !value.area)){
      const hint=document.querySelector('#listingBasicHint');
      if(hint){ hint.classList.add('is-error'); hint.textContent='Vui lòng điền tiêu đề, giá thuê và diện tích trước khi tiếp tục.'; }
      return;
    }
    if(landlordStep===2 && !value.amenities.length){
      alert('Hãy chọn ít nhất một tiện ích nổi bật cho tin đăng.');
      return;
    }
    if(landlordStep===3 && (!value.province || !value.district || !value.address)){
      alert('Vui lòng điền đủ khu vực và địa chỉ hiển thị.');
      return;
    }
    setLandlordStep(landlordStep+1);
  });

  const landlordBack=document.querySelector('#listingBackStep');
  if(landlordBack) landlordBack.addEventListener('click', function () { setLandlordStep(landlordStep-1); });

  document.querySelectorAll('[data-landlord-amenity]').forEach(function (button) {
    button.addEventListener('click', function () {
      button.classList.toggle('active');
      button.innerHTML=icon(button.classList.contains('active')?'check_circle':'add_circle')+'<span>'+button.dataset.landlordAmenity+'</span>';
      updateListingPreview();
    });
  });

  const landlordPhotoInput=document.querySelector('#landlordPhotoInput');
  if(landlordPhotoInput) landlordPhotoInput.addEventListener('change', function () {
    const preview=document.querySelector('#landlordPhotoPreview');
    if(!preview) return;
    if(!landlordPhotoInput.files.length){ preview.innerHTML='<div class="phase7-photo-placeholder">'+icon('photo_library')+'<span>Ảnh bạn chọn sẽ xuất hiện ở đây.</span></div>'; return; }
    preview.innerHTML='';
    Array.from(landlordPhotoInput.files).slice(0,6).forEach(function(file){
      const reader=new FileReader();
      reader.onload=function(){ const item=document.createElement('div'); item.className='phase7-photo-item'; item.innerHTML='<img alt="">'; item.querySelector('img').src=reader.result; preview.appendChild(item); };
      reader.readAsDataURL(file);
    });
    updateListingPreview();
  });

  document.querySelectorAll('#listingType,#listingPrice,#listingTitle,#listingArea,#listingTerm,#listingDescription,#listingProvince,#listingDistrict,#listingAddress,#listingLat,#listingLng').forEach(function(input){
    input.addEventListener('input', updateListingPreview);
    input.addEventListener('change', updateListingPreview);
  });

  const saveDraft=document.querySelector('#listingSaveDraft');
  if(saveDraft) saveDraft.addEventListener('click', function(){
    localStorage.setItem('80land:landlord:draft', JSON.stringify(listingFormValues()));
    alert('Đã lưu bản nháp.');
    navigate('/landlord');
  });

  const publish=document.querySelector('#listingPublish');
  if(publish) publish.addEventListener('click', function(){
    const value=listingFormValues();
    const existing=landlordRecords();
    const editId=value.id;
    const id=editId || 'draft-' + Date.now();
    const created={
      id:id,
      listingId:1,
      title:value.title,
      price:formatLandlordPrice(value.price).replace(/\.0+$/,''),
      area:value.area + ' m²',
      location:(value.district || 'Khu vực') + ', ' + (value.province || 'TP. Hồ Chí Minh'),
      views:'0',
      leads:'0',
      status:'pending',
      updated:'Vừa xong',
      custom:true
    };
    const extras=existing.filter(function(item){ return item.custom && String(item.id)!==String(id); });
    extras.push(created);
    localStorage.setItem('80land:landlord:records', JSON.stringify(extras));
    localStorage.removeItem('80land:landlord:draft');
    localStorage.setItem('80landlord:status:' + id, 'pending');
    alert('Tin đã được gửi và chuyển sang trạng thái chờ duyệt.');
    navigate('/landlord');
  });

  const liveImageInput=document.querySelector('#landlordPhotoInput');
  if(liveImageInput){ updateListingPreview(); }

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
