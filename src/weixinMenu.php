<?php
class weixinMenu {

	public static $appid = "wx8038449d59b1e34d";   // 申请得到的appid

	public static $secret = "ae14460a9e34757f2344aeade60bf404";  // 申请得到的secret 

	public static $getToken = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";

	public static $createMenu = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=";

	public static $getMenu ="https://api.weixin.qq.com/cgi-bin/menu/get?access_token=";

	public static $delMenu = "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=";

	public static $opt = array(
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_SSL_VERIFYHOST => false,
			CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)',
			CURLOPT_FOLLOWLOCATION => 1,
			CURLOPT_AUTOREFERER =>1,
			CURLOPT_RETURNTRANSFER => true
			);

	public $ACCESS_TOKEN = null;

	/**
	 * 创建菜单
	 */
	public function create()
	{

		$this->token();

		$strMeau = '{
    "button": [
        {
            "name": "我是会员", 
            "sub_button": [
                {
                    "type": "view", 
                    "name": "账号绑定", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html#login"
                }, 
                {
                    "type": "view", 
                    "name": "项目信息", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html#itemsListPage"
                }, 
                {
                    "type": "view", 
                    "name": "我的投资", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html#mine"
                }
            ]
        }, 
        {
            "name": "投资信息", 
            "sub_button": [
                {
                    "type": "view", 
                    "name": "投资流程", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html"
                }, 
                {
                    "type": "view", 
                    "name": "投资风险", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html"
                }, 
                {
                    "type": "view", 
                    "name": "投资收益", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html"
                }, 
                {
                    "type": "view", 
                    "name": "投资案例", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html"
                }
            ]
        }, 
        {
            "name": "关于投资", 
            "sub_button": [
                {
                    "type": "view", 
                    "name": "投资宝典", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html"
                }, 
                {
                    "type": "view", 
                    "name": "常见问题", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html"
                }, 
                {
                    "type": "view", 
                    "name": "联系我们", 
                    "url": "http://120.27.28.183:8080/SihaiApp/page/SihaiApp.html"
                }
            ]
        }
    ]
}';

		$ret = $this->HttpPost(self::$createMenu.$this->ACCESS_TOKEN,self::$opt, $strMeau);
		echo $ret;
	}

	/**
	 * 查询菜单
	 */
	public function get()
	{
		$this->token();
		$ret = $this->HttpGet(self::$getMenu.$this->ACCESS_TOKEN,self::$opt);
		echo $ret;		
	}

	/**
	 * 取消菜单
	 */
	public function del()
	{
		$this->token();
		$ret = $this->HttpGet(self::$delMenu.$this->ACCESS_TOKEN,self::$opt);
		echo $ret;
		echo "hello";
	}

	/**
	 * 获取token
	 */
	private function token()
	{
		$tokenUrl = self::$getToken."&appid=".self::$appid."&secret=".self::$secret;
		$ret = $this->HttpGet($tokenUrl,self::$opt);
		$arrRet = json_decode($ret,true);
		$this->ACCESS_TOKEN = $arrRet['access_token'];
	}

	/**
	 * POST 模式
	 * @param string $url       post 的地址
	 * @param array $opt        post 选项
	 * @param array $post_data  post 数据
	 * @return mixed
	 */
	private function HttpPost($url, $opt = array(),$post_data) 
	{
		$setopt = array(
				CURLOPT_HEADER => 0,                       
				CURLOPT_RETURNTRANSFER => 1,      
				CURLOPT_URL => $url,
				CURLOPT_CUSTOMREQUEST => 'POST',
				CURLOPT_POST => 1,                          
				CURLOPT_POSTFIELDS => $post_data, 
		);

		if ( !empty($opt) ) {
			foreach ($opt as $key => $value) {
				$setopt[$key] = $value;
			}
		}

		$curl = curl_init($url);

		foreach ($setopt as $key => $value) {
			curl_setopt($curl, $key, $value );
		}

		$responseText = curl_exec($curl);

		curl_close($curl);

		return $responseText;
	}

	/**
	 * GET 方式
	 * @param stinrg $url  GET 的url
	 * @param array  $opt  GET 的选项
	 * @return mixed 
	 */
	private function HttpGet($url, $opt = array()) 
	{
		$setopt = array(
				CURLOPT_HEADER => 0,
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_URL => $url
		);

		if ( !empty($opt) ) {
			foreach ($opt as $key => $value) {
				$setopt[$key] = $value;
			}
		}

		$curl = curl_init($url);

		foreach ($setopt as $key => $value) {
			curl_setopt($curl, $key, $value );
		}

		$responseText = curl_exec($curl);

		curl_close($curl);

		return $responseText;
	}
}
?>