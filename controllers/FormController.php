<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Form;

class FormController extends Controller
{

	public function actionIndex() {	
			 $model=new Form();
	 		  return $this->render('form', [ 'model' => $model ]);
						   		  }							  
	public function actionGetphone() { $model = new Form(); echo $model->Getphone(); exit; }//-ajax-							  
	public function actionPutdata() { $model = new Form(); echo $model->Putdata(); exit; }//-ajax-						  
								  

}
