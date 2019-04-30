<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Regresult;
use app\models\Form;

class RegresultController extends Controller
{

	public function actionIndex() {	
			 $model=new Regresult();			 
	 		  return $this->render('resultpage', [ 'model' => $model ]);
						   		  }
}
