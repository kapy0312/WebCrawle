var DataObject;
var textWithLink1, textWithLink12;

document.addEventListener("DOMContentLoaded", function (event) {
    // $('#item1-title').text('自由時報-即時新聞');
    // 執行
    triggerButtonClick();
});

// $(document).ready(function () {
function triggerButtonClick() {
    // alert("                 ");
    DataObject = {};
    $.ajax({
        url: "/scraperData",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(DataObject),
        // data: formData, // 如果要发送 FormData，可以直接传递
        success: function (data) {
            // resultDiv.innerText = "資料新增成功!\n" + JSON.stringify(data);
            // var parseData = JSON.stringify(data);
            // alert(parseData);
            // var d1 = data[0];
            // alert(parseData[0]);

            $('#item-title1').text('自由時報-即時新聞');
            $('#item-image1').attr('href', 'img/icon_LTN.png');
            $('#item-image1 img').attr('src', 'img/icon_LTN.png');
            $('#item-content1').html('');

            $('#item-title2').text('聯合新聞網-即時新聞');
            $('#item-image2').attr('href', 'img/icon_UDN.png');
            $('#item-image2 img').attr('src', 'img/icon_UDN.png');
            $('#item-content2').html('');

            $('#item-title3').text('壹蘋新聞網-即時新聞');
            $('#item-image3').attr('href', 'img/icon_APPLE.png');
            $('#item-image3 img').attr('src', 'img/icon_APPLE.png');
            $('#item-content3').html('');

            $('#item-title4').text('東森新聞-即時新聞');
            $('#item-image4').attr('href', 'img/icon_EBC.png');
            $('#item-image4 img').attr('src', 'img/icon_EBC.png');
            $('#item-content4').html('');

            $('#item-title5').text('ETtoday新聞-即時新聞');
            $('#item-image5').attr('href', 'img/icon_ETtoday.png');
            $('#item-image5 img').attr('src', 'img/icon_ETtoday.png');
            $('#item-content5').html('');

            $('#item-title6').text('中央社CNA-即時新聞');
            $('#item-image6').attr('href', 'img/icon_CNA.png');
            $('#item-image6 img').attr('src', 'img/icon_CNA.png');
            $('#item-content6').html('');

            $('#item-title7').text('公視新聞網-即時新聞');
            $('#item-image7').attr('href', 'img/icon_PTS.png');
            $('#item-image7 img').attr('src', 'img/icon_PTS.png');
            $('#item-content7').html('');

            data.forEach(newsItem => {

                if (newsItem.title.includes("自由時報") && newsItem.time != "" && newsItem.link != "") {

                    textWithLink1 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.time).css('color', 'black');

                    textWithLink2 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.title.replace('自由時報-', '')).css('color', 'black');

                    $('#item-content1').append(textWithLink1, '<br>', textWithLink2, '<br><br>');
                    return;
                }

                if (newsItem.title.includes("聯合新聞網") && newsItem.time != "" && newsItem.link != "") {

                    textWithLink1 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.time).css('color', 'black');

                    textWithLink2 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.title.replace('聯合新聞網-', '')).css('color', 'black');

                    $('#item-content2').append(textWithLink1, '<br>', textWithLink2, '<br><br>');
                    return;
                }

                if (newsItem.title.includes("壹蘋新聞網") && newsItem.time != "" && newsItem.link != "") {

                    textWithLink1 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.time).css('color', 'black');

                    textWithLink2 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.title.replace('壹蘋新聞網-', '')).css('color', 'black');

                    $('#item-content3').append(textWithLink1, '<br>', textWithLink2, '<br><br>');
                    return;
                }

                if (newsItem.title.includes("東森新聞") && newsItem.time != "" && newsItem.link != "") {

                    textWithLink1 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.time).css('color', 'black');

                    textWithLink2 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.title.replace('東森新聞-', '')).css('color', 'black');

                    $('#item-content4').append(textWithLink1, '<br>', textWithLink2, '<br><br>');
                    return;
                }

                if (newsItem.title.includes("ETtoday新聞") && newsItem.time != "" && newsItem.link != "") {

                    textWithLink1 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.time).css('color', 'black');

                    textWithLink2 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.title.replace('ETtoday新聞-', '')).css('color', 'black');

                    $('#item-content5').append(textWithLink1, '<br>', textWithLink2, '<br><br>');
                    return;
                }

                if (newsItem.title.includes("中央社CNA") && newsItem.time != "" && newsItem.link != "") {

                    textWithLink1 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.time).css('color', 'black');

                    textWithLink2 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.title.replace('中央社CNA-', '')).css('color', 'black');

                    $('#item-content6').append(textWithLink1, '<br>', textWithLink2, '<br><br>');
                    return;
                }

                if (newsItem.title.includes("公視新聞網") && newsItem.time != "" && newsItem.link != "") {

                    textWithLink1 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.time).css('color', 'black');

                    textWithLink2 = $('<a>').attr({
                        href: newsItem.link,
                        target: '_blank'
                    }).text(newsItem.title.replace('公視新聞網-', '')).css('color', 'black');

                    $('#item-content7').append(textWithLink1, '<br>', textWithLink2, '<br><br>');
                    return;
                }
            });
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
};

// });