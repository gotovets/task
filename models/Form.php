<?php



namespace app\models;

use Yii;
use yii\base\Model;

class Form extends Model {
					   
	public function Putdata() {
			$_POST['values']['step']=$_POST['step'];
 			$_POST['values']['phone']=preg_replace("/[^0-9]/", '', $_POST['values']['phone']);
			
			 if(!(isset($_COOKIE["pkey"]))) { $pkey=md5(microtime().rand()); } else { $pkey=$_COOKIE["pkey"]; }			

			  $v=array_map(function($x) { return empty($x)?'-':$x; }, $_POST['values']);			
			
			   $connection=Yii::$app->getDb();
			   
				$command=$connection->createCommand(" INSERT INTO users ( pkey,
																	 	  step,
																	 	  fname,
																	 	  lname,
																	 	  phone,
																	 	  str,
																	 	  build,
																	 	  city,
																	 	  comment )											 
													  VALUES (  '".$pkey."',
															    '".$_POST['values']['step']."',
															    '".$_POST['values']['fname']."',
															    '".$_POST['values']['lname']."',
															    '".$_POST['values']['phone']."',
															    '".$_POST['values']['str']."',
															    '".$_POST['values']['build']."',
															    '".$_POST['values']['city']."',
															    '".$_POST['values']['comment']."' )								   
													  ON DUPLICATE KEY UPDATE step=VALUES(step),
																			  fname=VALUES(fname),
																			  lname=VALUES(lname),
																			  phone=VALUES(phone),
																			  str=VALUES(str),
																			  build=VALUES(build),
																			  city=VALUES(city),
																			  comment=VALUES(comment) ")->execute();
			return json_encode([ "pkey"=>$pkey ]);
							  }							  			  
	public function Getdata() {
 			if(!(isset($_COOKIE["pkey"]))) { return [ 'step' => 1 ]; }

			 $connection=Yii::$app->getDb();
			  $data=$connection->createCommand("SELECT * FROM users WHERE pkey= '".$_COOKIE["pkey"]."'")->queryOne();
			  $data['step']++;
			  	
	  		 return $data;
    						  }							  
	public function Getphone() {
			$connection=Yii::$app->getDb();
			 $command=$connection->createCommand("SELECT step FROM users WHERE phone = '".$_POST['phone']."' AND step = 3 ");
			  $result=$command->queryOne();

	 		 return json_encode(array("phone"=>empty($result['step'])?"noexist":"exist"));
							   }
}
