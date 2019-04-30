<?php



namespace app\models;

use Yii;
use yii\base\Model;

class Regresult extends Model {

	public function Getdata() {
 			if(!isset($_GET['key'])) { return; }
 
  			 $connection=Yii::$app->getDb();
			 
			   return $connection->createCommand("SELECT * FROM users WHERE pkey = '".$_GET['key']."'")->queryOne();
							  }
}
