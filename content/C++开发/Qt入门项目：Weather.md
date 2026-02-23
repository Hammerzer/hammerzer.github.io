---
title: Qt入门项目：Weather
date: 2024-08-07 16:50:38
urlname: qt-project-weather
tags:
  - 操作系统与框架
  - Qt
  - CPP
  - 项目练习
categories: C++开发
description: Qt入门项目：Weather
draft: false
---

## CONTENT OUTLINE

>  <span style="background:#FFFF00;">Qt开发中的碎碎念</span>

<br>

## 一 Weather项目

### 1.1 项目设计

天气预报是我们经常使用的一个工具，一般我们在手机上、电脑上，都有独立的应用，来提供查询天气预报。

此处，我们使用 `Qt` 来开发一款天气预报的应用。

![](qtproj-1-1.png)

**功能包括：**

1. 有城市的天气预报，有背景图、控件半透明化。
2. 显示日期，城市名称，当天的天气预报
3. 当天天气预报的详细数据
4. 该天的一些生活指数：如感冒指数、每日寄语
5. 当天的日出日落时间，及扇形时间占比
6. 该城市，前一后四天的天气预报，含有日期，星期，天气，高低温
7. 最近一周的温湿度曲线
8. 搜索框、刷新按钮
9. 窗口大小固定，无最大、最小化、关闭按钮。鼠标拖动窗口移动，右键退出。
10. 自定义按钮图标

**实现思路：**

1. UI
   - 绘制基本界面，设计界面网状表格
   - 添加控件、添加资源图片
2. 网络
   - 请求数据
   - 解析数据
3. UI
   - 根据数据更新控件上的数据和资源图标
   - 根据数据绘制图案

<br>

> 以下每个步骤均只简要记录。

### 1.2 创建项目

- 使用`QWidget`创建项目【不需要QMainWindow的状态栏和菜单栏】

- 添加`qrc`资源文件时，此项目是在三个图像文件夹中分别创建三个qrc文件，即在创建对话框中填写的路径为`/icons/icons`【以icons文件夹为例】

- UI编辑器设置画布大小为`800*450`，然后从左侧选择Containers中Widget，直接从工具栏中拖到窗口，设置高宽将父组件他铺满【也可以在属性里设置坐标 (0, 0)，高宽`800*450`】，最后设置styleSheet属性：

  ```css
  QWidget#widget{
  	border-image: url(:/weaUI/weaUI.png);
  	color:rgb(255, 255, 255);
  }
  QLabel{
      font: 25 10pt "Microsoft YaHei";
      border-radius: 4px;
      background-color: argb(60, 60, 60, 130);
  	color: rgb(255, 255, 255);
  }
  Line{
  	background-color: rgb(0, 85, 0);
  }
  /*将 widget 的 border-image（背景图片）设置成 weaUI.png
   *字体颜色设置：255, 255, 255（白色）
   *QLabel控件设置字体。border-radius（圆角边半径）4 个像素。
   *background-color（背景颜色）：argb(60, 60, 60, 130);【对于rgb值和透明度】
   *Line线条控件的 background-color: rgb(0, 85, 0);背景颜色 */
  ```

  

- 设置无边框窗口和不可缩放

  ```c++
   //设置窗口属性为无边框窗口
  setWindowFlag(Qt::FramelessWindowHint);
  //设置不可在右下角缩放
  setFixedSize(width(), height());
  ```

- 如果需要编辑ui的XML文件，需要使用外部软件【如Notepad++】打开修改。此处修改QMainWindow为QWidget。

<br>

### 1.3 鼠标拖动窗体和右键退出

**右键退出**

- 在头文件的类的私有成员变量声明中加入QMenu指针【退出菜单】、QAction行为【exit行为，即右键菜单中的选项】
- 在QWidget类的实现中，将两个私有指针指向新创建的QMenu和QAction，并设置文本、Icon，将QAction加入QMenu并使用connect注册信号和槽关系。
- 需要实现contextMenuEvent函数【鼠标右击菜单事件】和槽函数`slot_exitApp()`

**鼠标拖动**

- 新增一个QPoint私有成员记录差值
- 新增两个事件【mousePressEvent | mouseMoveEvent】函数并实现
- 鼠标拖动的实现思路：保持鼠标点击拖动时位置与应用窗口的相对位置保持不变【约束条件】
  - 鼠标按下时，记录差值，即鼠标点击的屏幕坐标 - 窗口的屏幕坐标。【其实记录鼠标在窗口内的坐标】
  - 鼠标移动时同步修改窗口坐标为【鼠标的屏幕坐标 - 差值】

<br>



### 1.4 绘制基础界面

基础控件

- 新增一个`Line Edit`【只显示一行的文本框，用于显示和输出城市】，并设置位置和大小属性。
- 新增一个`Label`【用于显示日期】，并设置属性：位置、大小、本文字体及字号、对齐方式、StyleSheet等。
- 新增三个水平Line【属于Display Widget，用于分配区域】，分别修改位置参数。

网格布局

- 在第二线与第三线之间添加Grid Layout，再向其中加入4行3列的Label控件【默认等高等宽分割，想要得到不等分割的单元格，需要添加后点击并Delete删除，再将旁侧单元格拉长占用】，这样就可以等到等高且1:3宽度的表格布局。
- 修改Label属性：对象名、对齐方式、【可选择多个同时修改】
- 值得注意的一点是：形成三行合并的部分【在两大竖行合并时，如果删除其中一个，则网格会塌陷为两行；此时只需要将其中列数较小的一个Label拖至其他网格即可】



<br>

### 1.5 添加UI控件

UI控件命名、默认内容、样式的填写

### 1.6 控件添加图标资源

> 剩余左上角、左下角部分布局

- 实现竖排文本：打开文本编辑框，回车换行的方式会产生较大行距，可Shift+换行。
- 左下角新增文本工具【text browser】
- 右上角搜索框内添加按钮【tool Button，用于搜索确认】，设置位置属性、图标【使用styleSheet中的border-image】。
- 右上角搜索框右侧添加按钮【tool Button，用于刷新】，设置位置属性、图标【使用styleSheet中的border-image】、背景色。
- 修改右上角输入框的悬浮鼠标样式【】

<br>

### 1.7 QJson

`QJson` 是 `Json` 的一种扩展，也就是一种简单的数据结构。

在本天气预报应用中，数据时刻都在更新。因此，我们需要向网络公共API请求数据，并接收 Json 格式的返回。

> 那么什么是 Json？ JSON【JavaScript Object Notation】 是一种轻量级的数据交换格式。它使得人们很容易的进行 阅读和编写。同时也方便了机器进行解析和生成。它是基于 JavaScript Programming Language , Standard ECMA-262 3rd Edition - December 1999 的一个子集。
>
> JSON 采用完 全独立于程序语言的文本格式，但是也使用了类 C 语言的习惯（包括 C, C++, C#, Java, JavaScript, Perl, Python 等）。这些特性使 JSON 成为理想的数据交换语言。

 `Json` 基于两种结构： 

1. 名称：值
2. 值的有序列表 

而 `QJson` 也就是 Qt 版的 `Json`，具体内容查阅文档【QJsonDocument】

```c++
#include <QJsonDocument>	//读取和写入 Json 类
#include <QJsonValue>		//值
#include <QJsonObject>		//JSON对象是键值对的列表，其中键是唯一的字符串，值由QJsonValue表示
#include <QJsonArray>		//值列表，可以通过从数组中插入和删除 QJsonValue 来操作列表
#include <QJsonParseError>	//用于报告 JSON 解析过程中的错误

//QJsonValue：QJson 的值有下列几种形式：
//enum QJsonValue::Type
QJsonValue::Null 		0x0A 	Null value
QJsonValue::Bool		0x1A 	boolean value. Use toBool() to convert to a bool.
QJsonValue::Double		0x2A 	number value. Use toDouble() to convert to a double, or toInteger() to convert to a qint64.
QJsonValue::String		0x3A 	string. Use toString() to convert to a QString.
QJsonValue::Array		0x4An 	array. Use toArray() to convert to a QJsonArray.
QJsonValue::Object		0x5An 	object. Use toObject() to convert to a QJsonObject.
QJsonValue::Undefined	0x80The value is undefined. This is usually returned as an error condition, when trying to read an out of bounds value in an array or a non existent key in an object
//注意：Array内的数据类型不一定相同，但代码规范要求数据类型一致
    
//测试：www.json.cn
{"message":"天气预报","key":true,"array":[false,1,2,3.3]}
//对应的json解析：
{
    "message": "天气预报",
    "key": true,
    "array": [
        false,
        1,
        2,
        3.3
    ]
}
```

<br>

### 1.8 查询天气预报的开放API

```web-idl
http://t.weather.itboy.net/api/weather/city/101010100/
```

> 101010100为对应城市的编码

```json
{
    "message": "success感谢又拍云(upyun.com)提供CDN赞助",
    "status": 200,
    "date": "20240814",
    "time": "2024-08-14 14:04:04",
    "cityInfo": {
        "city": "北京市",
        "citykey": "101010100",
        "parent": "北京",
        "updateTime": "12:04"
    },
    "data": {
        "shidu": "57%",
        "pm25": 12,
        "pm10": 21,
        "quality": "优",
        "wendu": "32.9",
        "ganmao": "各类人群可自由活动",
        "forecast": [
            {
                "date": "14",
                "high": "高温 31℃",
                "low": "低温 22℃",
                "ymd": "2024-08-14",
                "week": "星期三",
                "sunrise": "05:25",
                "sunset": "19:12",
                "aqi": 41,
                "fx": "东风",
                "fl": "2级",
                "type": "晴",
                "notice": "愿你拥有比阳光明媚的心情"
            },
            /*date:15~28...........*/
        ],
        "yesterday": {
            "date": "13",
            "high": "高温 28℃",
            "low": "低温 23℃",
            "ymd": "2024-08-13",
            "week": "星期二",
            "sunrise": "05:24",
            "sunset": "19:13",
            "aqi": 19,
            "fx": "东北风",
            "fl": "2级",
            "type": "阴",
            "notice": "不要被阴云遮挡住好心情"
        }
    }
}
```

<br>

### 1.9 读取本地Json的城市列表并解析

- 新增头文件`WeatherTool.h`【解析本地资源文件】，并在其中初始化读取本地Json资源，读取流程如图所示：

  ![](qtproj-1-2.png)

- 新增两个类【当天天气类Today、天气预报数据类Forecast】，都放在头文件`weatherdata.h`中直接定义。

- 新增`weatherdata.cpp` 文件对类中变量做初始，以及`=`号操作的实现。需要注意字符串数值的转换，如：

  ```cpp
  pm25 = QString::number( dataObj.value("pm25").toDouble() );
  ```

  

<br>

### 1.10 Ui及数据的初始化操作

- 在widget.h中新增私有变量，用于管理ui数据【7个`QList`】
- `<<`是 Qt 中QList的重载操作符，用于向列表中追加数据。
- 遍历 forecast_week_list 和 forecast_date_list，添加样式和更改数据。
- 设置右上角搜索框的样式：圆角、透明度。

> 注意：脚本只识别rgba或rgb，而不是argb。

<br>

### 1.11 请求天气 API 数据

使用Qt中的 `QNetworkAccessManager` 类，调用API网络接口，该类允许应用程序发送网络请求并接收响应。 

- 在使用之前需要头文件：`#include <QNetworkAccessManager>`
- 而且在 `pro` 文件中，要添加：`QT += network` 才能正常使用：`QT += core gui network`
- 对于 `http` 来说，最常见的就是`post` 和 `get`请求，该类中也封装了相应的函数。

```c++
//Header:  #include <QNetworkAccessManager>
//qmake: QT += network
//Inherits: QObject
QNetworkReply *get(const QNetworkRequest &request);


//【QNetworkReply】 请求后的数据和报头
//Header:  #include <QNetworkReply>
//qmake: QT += network
//Inherits: QIODevice

//【QNetworkRequest】保存要用 QNetworkAccessManager 发送的请求
QNetworkRequest();
QNetworkRequest(const QUrl &url);//使用QUrl直接构造
QNetworkRequest(const QNetworkRequest &other);

//QUrl构造
QUrl();
QUrl(const QString &url, QUrl::ParsingMode parsingMode = TolerantMode);//使用字符串构造
QUrl(const QUrl &other);
QUrl(QUrl &&other);
```



在 `widget.h` 头文件中新增私有成员变量：

```cpp
//Network
QString url;        //接口的链接
QString city;       //访问的城市
QString cityTmp;    //临时城市
WeatherTool tool;   //天气工具对象
QNetworkAccessManager* manager;
```

在其实现的构造函数中初始化并注册信号和槽函数的对应关系：

```c++
//网络请求初始化
// 请求天气 API 信息
url = "http://t.weather.itboy.net/api/weather/city/";
city = "长沙";
cityTmp = city;
manager = new QNetworkAccessManager(this);
//finished(QNetworkReply*)信号是QNetworkAccessManager自带的
connect(manager, SIGNAL(finished(QNetworkReply*)), this, SLOT(replayFinished(QNetworkReply*)));
getWeatherInfo(manager);
```

注意：

- 槽函数 `replayFinished(QNetworkReply*)` 需要加入到 `widget.h` 声明中，并在 `widget.cpp` 中实现。
- `getWeatherInfo(manager)` 函数作为 `protected`函数在`widget.h`中声明，并在 `widget.cpp` 中实现。
- `parseJson(QByteArray& bytes)` 函数作为 `protected`函数在`widget.h`中声明，并在 `widget.cpp` 中实现。

```cpp
/*槽函数：处理网络请求回调*/
void Widget::replayFinished(QNetworkReply* reply){
    QVariant status_code = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute);
    if(reply -> error() != QNetworkReply::NoError || status_code != 200){
        QMessageBox::warning(this, u8"错误", u8"天气：请求数据错误，检查网络连接！", QMessageBox::Ok);
        return;
    }
    QByteArray bytes = reply->readAll();
    qDebug() << bytes;
    parseJson(bytes);
}
/*请求数据*/
void Widget::getWeatherInfo(QNetworkAccessManager* manager){
    QString citycode = tool[city];//WeatherTool重载了[]运算符
    if(citycode=="000000000"){
        QMessageBox::warning(this, u8"错误", u8"天气：指定城市不存在！", QMessageBox::Ok);
        return;
    }
    QUrl jsonUrl(url + citycode);   //创建一个QUrl类实例jsonUrl，并使用QString初始化
    manager->get( QNetworkRequest(jsonUrl) );
}
```

<br>

### 1.12 解析天气信息

- 在 `widget.h` 头文件中新增私有成员变量：本地数据【`Today today;  Forecast forecast[6];`】
- `parseJson(QByteArray& bytes)` 解析函数见1.11节。

```c++
//解析接口数据
void Widget::parseJson(QByteArray& bytes){
    QJsonParseError err;
    QJsonDocument jsonDoc = QJsonDocument::fromJson(bytes, &err); // 检测json格式
    if (err.error != QJsonParseError::NoError) // Json 格式错误
    {
        return;
    }
    QJsonObject jsObj = jsonDoc.object();
    // qDebug() << jsObj << "\n============\n";
    // qDebug() << jsObj.value("message") << "\n============\n";
    QString message = jsObj.value("message").toString();
    if (message.contains("success")==false)
    {
        QMessageBox::information(this, tr("The information of Json_desc"), u8"天气：城市错误！", QMessageBox::Ok );
        city = cityTmp;
        return;
    }
    // Today对象重载了=，即使用jsobj来初始化today
    today = jsObj;
    
    // 解析 data 中的 yesterday
    QJsonObject dataObj = jsObj.value("data").toObject();
    forecast[0] = dataObj.value("yesterday").toObject();
    
    // 解析 data 中的 forecast
    QJsonArray forecastArr = dataObj.value("forecast").toArray();
    int j = 0;
    for (int i = 1; i < 6; i++)
    {
        forecast[i] = forecastArr.at(j).toObject();
        j++;
    }
}
```



<br>

### 1.13 应用数据

- `void setLabelContent()` 函数作为 `protected`函数在`widget.h`中声明，并在 `widget.cpp` 中实现，用于将数据应用在ui组件上。
- 新增 `WeatherTypeIcoTool` 类【几乎类似 `WeatherTool` 类】，用于读取本地Json，建立天气类型字段与其对应图标的对应关系。



<br>

### 1.14 绘制日出日落曲线

#### 1.14.1 `QPainter` 类

`QPainter` 类，用于低级【点、线、面】图像绘制。`QPainter` 类的成员有一下几种角色：

- QPen : 用于绘制几何图形的边缘，由颜色、宽度线风格等参数组成；
- QBrush : 用于填充几何图形的调色板,由颜色和填充风格组成；
- QFont : 用于文本绘制；
- QPixmap : 绘制图片，可以加速显示，带有屏幕截图、窗口截图等支持，适合小图片；
- QImage : 绘制图片，可以直接读取图像文件进行像素访问，适合大图片；
- QBitmap : `QPixmap` 的一个子类，主要用于显示单色位图；
- QPicture : 绘图装置，用于记录和重播 `Qpainter` 的绘图

`QPainter` 基础图形绘制相关函数：

```c++
/*
Header:  #include <QPainter>
qmake: QT += gui
Inherited By: QStylePainter
*/
// 注意：【其他重载见帮助文档】
// 绘制点
void drawPoint(int x, int y);
// 绘制弦
void drawChord(int x, int y, int width, int height, int startAngle, int spanAngle);
// 绘制直线
void drawLine(int x1, int y1, int x2, int y2);
void drawLine(const QPoint &p1, const QPoint &p2);
// 绘制多边形
void drawPolygon(const QPointF *points, int pointCount, Qt::FillRule fillRule = Qt::OddEvenFill);
// 绘制矩形
void drawRect(int x, int y, int width, int height);
// 绘制圆角矩形
void drawRoundedRect(int x, int y, int w, int h, qreal xRadius, qreal yRadius, Qt::SizeMode mode = Qt::AbsoluteSize);
// 绘制圆弧
void drawArc(int x, int y, int width, int height, int startAngle, int spanAngle);
// 绘制折线
void drawPolyline(const QPointF *points, int pointCount);
// 绘制椭圆
void drawEllipse(int x, int y, int width, int height);
// 绘制凹多边形
void drawConvexPolygon(const QPointF *points, int pointCount);
// 绘制扇形
void drawPie(int x, int y, int width, int height, int startAngle, int spanAngle);
// 绘制文本
void drawText(const QRect &rectangle, int flags, const QString &text, QRect *boundingRect = nullptr);
```



#### 1.14.2 绘制日出日落曲线

本应用中绘制日出日落曲线，使用Pen绘制直线、曲线、文字，使用刷子绘制扇形。

```c++
// 日出日落底线
const QPoint Widget::sun[2] = {
    QPoint(20, 75),
    QPoint(130, 75)
};
// 日出日落时间
const QRect Widget::sunRizeSet[2] = {
    QRect(0, 80, 50, 20),
    QRect(100, 80, 50, 20)
};
// 日出日落圆弧
const QRect Widget::rect[2] = {
    QRect(25, 25, 100, 100), // 虚线圆弧
    QRect(50, 80, 50, 20) // “日出日落”文本
};

void Widget::paintSunRiseSet(){
    //首先指明绘图位置：事先设计的Label位置
    QPainter painter(ui->sunRiseSetLb);
    //QPainter反锯齿设置:去除直线毛边
    painter.setRenderHint(QPainter::Antialiasing, true);

    //save保存当前绘制器状态（将状态推送到堆栈上）
    //save后面必须跟有相应的restore【重置】、end【结束、释放资源】函数使用
    //end 通常不需要调用，一般由析构函数来调用
    painter.save();
    QPen pen = painter.pen();//创建 QPen 对象，用于绘制几何图形的边缘，可理解为一支笔
    pen.setWidthF(0.5);      //设置笔的宽度
    pen.setColor(Qt::yellow);//设置笔的颜色
    painter.setPen(pen);     //将笔添加到绘制器中
    painter.drawLine(sun[0], sun[1]);//;绘制直线【日出日落底线】，参数为两端点
    painter.restore();

    //绘制日出日落文字
    painter.save();
    painter.setFont( QFont("Microsoft Yahei", 8, QFont::Normal) ); // 字体、大小、正常粗细
    painter.setPen(Qt::white);
    if (today.sunrise != "" && today.sunset != ""){
        //在指定区域内绘制文字
        painter.drawText(sunRizeSet[0], Qt::AlignHCenter, today.sunrise);
        painter.drawText(sunRizeSet[1], Qt::AlignHCenter, today.sunset);
    }
    painter.drawText(rect[1], Qt::AlignHCenter, u8"日出日落");//在指定区域绘制文字
    painter.restore();

    // 绘制圆弧
    painter.save();
    pen.setWidthF(0.5);         //设置线条的宽度 0.5
    pen.setStyle(Qt::DotLine);  //虚线
    pen.setColor(Qt::green);    //设置颜色
    painter.setPen(pen);
    //drawArc(绘制的区域，其实角度，终止角度)
    //Qt中角度的基数是16分之一度，所以在任何话圆弧的地方，都要乘以16
    painter.drawArc(rect[0], 0 * 16, 180 * 16); //绘制圆弧 0~180度
    painter.restore();

    // 绘制日出日落占比
    if (today.sunrise != "" && today.sunset != "")
    {
        painter.setPen(Qt::NoPen);//关闭画笔
        painter.setBrush(QColor(255, 85, 0, 100));//设置画刷
        int startAngle, spanAngle;
        QString sunsetTime = today.date + " " + today.sunset;
        if (QDateTime::currentDateTime() > QDateTime::fromString(sunsetTime, "yyyy-MM-dd hh:mm")){
            startAngle = 0 * 16;
            spanAngle = 180 * 16;
        }
        else{
            // 计算起始角度和跨越角度
            static QStringList sunSetTime = today.sunset.split(":");
            static QStringList sunRiseTime = today.sunrise.split(":");
            static QString sunsetHour = sunSetTime.at(0);
            static QString sunsetMint = sunSetTime.at(1);
            static QString sunriseHour = sunRiseTime.at(0);
            static QString sunriseMint = sunRiseTime.at(1);
            static int sunrise = sunriseHour.toInt() * 60 + sunriseMint.toInt();
            static int sunset = sunsetHour.toInt() * 60 + sunsetMint.toInt();
            int now = QTime::currentTime().hour() * 60 + QTime::currentTime().minute();
            startAngle = ( (double)(sunset - now) / (sunset - sunrise) ) * 180 * 16;
            spanAngle = ( (double)(now - sunrise) / (sunset - sunrise) ) * 180 * 16;
        }
        if (startAngle >= 0 && spanAngle >= 0)
        {
            painter.drawPie(rect[0], startAngle, spanAngle); // 扇形绘制
        }
    }
    // painter.end();//析构时自动end
}
```

值得注意的是：何时如何调用 `paintSunRiseSet` 函数？

- 在 `Widget` 构造函数中，注册定时器和事件连接

  ```cpp
  Widget::Widget(QWidget *parent)
      : QWidget(parent)
      , ui(new Ui::Widget)
  {
      ui->setupUi(this);
      //......
      //安装绘图事件
      ui->sunRiseSetLb->installEventFilter(this);//在eventFilter函数中处理
      
      //自动刷新日出日落曲线    
      sunTimer = new QTimer(ui->sunRiseSetLb);
      sunTimer->start(2000);	//2s触发一次
      // 当定时器时间到期，自动触发sunRiseSetLb的update()
      connect(sunTimer, SIGNAL(timeout()), ui->sunRiseSetLb, SLOT(update()));
  }
  ```

  

- `virtual bool eventFilter(QObject* watched, QEvent* event)` 函数作为 `public`函数在`widget.h`中声明，并在 `widget.cpp` 中实现，用于接收事件信号【如果是来自 `sunRiseSetLb` 的绘图事件信号，则处理，其余事件交予父类的默认处理】

  ```cpp
  bool Widget::eventFilter(QObject* watched, QEvent* event){
      if(watched == ui->sunRiseSetLb && event->type() == QEvent::Paint){
          paintSunRiseSet();
      }
      // 否则为默认处理
      return QWidget::eventFilter(watched, event);
  }
  ```

  




<br>

### 1.15 绘制温湿度折线

- `void paintCurve()` 函数作为 `protected`函数在`widget.h`中声明，并在 `widget.cpp` 中实现，用于绘制温湿度折线。
- 添加事件过滤，即时渲染。





<br>

### 1.16 收尾功能

**① 搜索**

在UI设计界面，右击刷新图标，选择转到槽，选择点击事件 `clicked()`。

自动添加 `on_refreshBt_clicked()` 槽函数，并编写细节：

```cpp
void Widget::on_refreshBt_clicked()
{
    getWeatherInfo(manager);
    ui->curveLb->update();
}

void Widget::on_searchBt_clicked()
{
    cityTmp = city;
    city = ui->cityLineEdit->text();
    getWeatherInfo(manager);
}
```

<br>

**② 刷新**

同上一小节的搜索，自动添加`on_searchBt_clicked ()`函数，并编写细节，详见上。

<br>

**③ 事件过滤**

为温湿度曲线、编辑框、日出日落曲线添加事件过滤器

1. 在 `Widget` 构造函数中安装事件过滤器

   ```c++
   	//安装绘图事件
       ui->sunRiseSetLb->installEventFilter(this);
       ui->cityLineEdit->installEventFilter(this);
       ui->curveLb->installEventFilter(this);
   ```

   

2. 在自定义事件过滤器中对特定事件进行处理

   ```cpp
   //widget.h中
   public:
       Widget(QWidget *parent = nullptr);
       ~Widget();
       virtual bool eventFilter(QObject* watched, QEvent* event);
   
   //widget.cpp中
   bool Widget::eventFilter(QObject* watched, QEvent* event){
       if(watched == ui->sunRiseSetLb && event->type() == QEvent::Paint){
           paintSunRiseSet();
       }
       else if(watched == ui->curveLb && event->type() == QEvent::Paint){
           paintCurve();
       }
       // 否则为默认处理
       return QWidget::eventFilter(watched, event);
   }
   ```

   



<br>

## 二 Problems

### 2.1 中文乱码问题



https://www.bilibili.com/read/cv30909641/【Qt程序乱码-从理解到消失】

https://www.jb51.net/article/275365.htm【QT6中QTextcodec头文件找不到的解决方法】

https://blog.csdn.net/weixin_34342578/article/details/92364764?ops_request_misc=&request_id=&biz_id=102&utm_term=qt%E5%A6%82%E4%BD%95%E6%94%AF%E6%8C%81%E4%B8%AD%E6%96%87%E8%B5%84%E6%BA%90&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-92364764.142【QT怎样支持中文】

【未解决】资源【如图片】文件名字带中文，不能编译

> 修改资源名称为英文字符，从而绕过该问题。

注意：Qt 中使用中文的时候，在字符串的前面加 u8，若编译不还是报错，可以试着用 notpad++，或者 vscode 打开该文件，使用编码 utf-8 Bom 保存。再到项目里面来编译就不 会有报中文的错误了



```
qt.gui.imageio: libpng warning: iCCP: known incorrect sRGB profile
```

在Qt开发过程中使用了一些png图片导致报了这个信息，是因为这些png图片中嵌入了icc颜色管理模块导致。

解决方法：

下载[JQTools](https://github.com/188080501/JQTools/releases/tag/V20.6.9)工具，然后点击“Qt相关”->“PNG告警消除”，选择图片进行转换便可以消除告警。