import React from 'react'
import './member.scss'
export default function Filter(props) {
    return (
    <div id='filter'>
        <div id='options'>
            <div id='select-group' className='select'>
                <label>Thể loại:</label>
                <select className="form-select" id='genre' onChange={props.onSetGenre}>
                    <option value="all" id="all">- Tất cả -</option>
                    <option value="Music" id="am-nhac">Âm nhạc</option>
                    <option value="Drama" id="chinh-kich">Chính kịch</option>
                    <option value="Family" id="gia-dinh">Gia đình</option>
                    <option value="Thrille" id="giat-gan">Giật gân</option>
                    <option value="Comedy" id="hai">Hài</option>
                    <option value="Action" id="hanh-dong">Hành động</option>
                    <option value="Animation" id="hoat-hinh">Hoạt hình</option>
                    <option value="Fantasy" id="ky-ao">Kỳ ảo</option>
                    <option value="Adventure" id="phieu-luu">Phiêu lưu</option>
                    <option value="Crime" id="toi-pham">Tội phạm</option>
                    <option value="Sci-Fi" id="vien-tuong">Viễn tưởng</option>
                </select>
            </div>
            <div id='select-group' className='select'>
                <label>Quốc gia:</label>
                <select className='form-select' id='country' onChange={props.onSetCountry}>
                    <option value="all" id="all">- Tất cả -</option>
                    <option value="United States" id="US">Mỹ</option>
                    <option value="South Korea" id="KR">Hàn Quốc</option>
                    <option value="Britain" id="GB">Anh</option>
                    <option value="France" id="FR">Pháp</option>
                    <option value="Canada" id="CA">Canada</option>
                    <option value="Hong Kong" id="HK">Hồng Kông</option>
                    <option value="Japan" id="JP">Nhật Bản</option>
                    <option value="China" id="CN">Trung Quốc</option>
                    <option value="Taiwan" id="TW">Đài Loan</option>
                    <option value="India" id="IN">Ấn Độ</option>
                    <option value="Thailand" id="TH">Thái Lan</option>
                    <option value="Australia" id="AU">Úc</option>
                    <option value="Vietnam" id="VN">Việt Nam</option>
                    <option value="Germany" id="DE">Đức</option>
                    <option value="Switzerland" id="SE">Thụy Điển</option>
                    <option value="Italia" id="IT">Ý</option>
                    <option value="Hungary" id="HU">Hungary</option>
                    <option value="New Zealand" id="NZ">New Zealand</option>
                    <option value="Russia" id="RU">Nga</option>
                    <option value="Iceland" id="IS">Iceland</option>
                    <option value="Finland" id="FI">Phần Lan</option>
                    <option value="Comlombia" id="CO">Colombia</option>
                    <option value="Denmark" id="DK">Đan Mạch</option>
                    <option value="Begium" id="BE">Bỉ</option>
                    <option value="Spain" id="ES">Tây Ban Nha</option>
                    <option value="Argentina" id="AR">Argentina</option>
                    <option value="Netherlands" id="NL">Hà Lan</option>
                    <option value="Norway" id="NO">Na Uy</option>
                    <option value="Singapore" id="SG">Singapore</option>
                    <option value="Poland" id="PL">Ba Lan</option>
                    <option value="Malaysia" id="MY">Malaysia</option>
                    <option value="Indonesia" id="ID">Indonesia</option>
                    <option value="Iran" id="IR">Iran</option>
                    <option value="Brazil" id="BR">Brazil</option>
                    <option value="Mexico" id="MX">Mexico</option>
                    </select>
            </div>
            <div id='select-group' className='select'>
                <label>Năm:</label>
                <select className="form-select" id='year' onChange={props.onSetYear}>
                    <option value="all" id="all">- Tất cả -</option>
                    <option value="2022-" id="2022">2022</option>
                    <option value="2021" id="2021">2021</option>
                    <option value="2020" id="2020">2020</option>
                    <option value="2019" id="2019">2019</option>
                    <option value="2018" id="2018">2018</option>
                    <option value="2017" id="2017">2017</option>
                    <option value="2016" id="2016">2016</option>
                    <option value="2015" id="2015">2015</option>
                    <option value="2014" id="2014">2014</option>
                    <option value="2013" id="2013">2013</option>
                    <option value="2012" id="2012">2012</option>
                    <option value="-2012" id="-2012">Trước 2012</option>
                </select>
            </div>
            <div id='select-group' className='select'>
                <label>Thời lượng:</label>
                <select className="form-select"  id='duration' onChange={props.onSetDuration}>
                    <option value="all" id="all">- Tất cả -</option>
                    <option value="0-60" id="0-60">Dưới 1 tiếng</option>
                    <option value="60-90" id="60-90">1 - 1.5 tiếng</option>
                    <option value="90-120" id="90-120">1.5 - 2 tiếng</option>
                    <option value="120-150" id="120-150">2 - 2.5 tiếng</option>
                    <option value="150-300" id="150-300">Trên 2.5 tiếng</option>
                </select>
            </div>
            <div id='select-group' className='select'>
                <label>Sắp xếp:</label>
                <select className="form-select" id='sort' onChange={props.onSetSort}>
                    <option value="createdAt">Ngày cập nhật</option>
                    <option value="Released">Ngày phát hành</option>
                    <option value="imdbRating">Điểm đánh giá</option>
                </select>
            </div>
            <div className="icon-arranges">
                <label >Hiển thị:</label>
                <span className="material-icons icon-arrange icon-arrange-dark" id='module' onClick={props.onArrangeModule}>view_module</span>
                <span className="material-icons icon-arrange" id='list' onClick={props.onArrangeList}>list</span>
            </div>
        </div>
    </div>
  )
}