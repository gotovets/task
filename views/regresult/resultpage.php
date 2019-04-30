<?php

/* @var $this yii\web\View */
use yii\helpers\Html;

$this->title = 'Завершение регистрации';
$this->registerCssFile("css/result.css");
 $data=$model->Getdata();

?>

<div id="header">Завершение</div>

 <div id="info">

 	<p><?= $data['step']<3 || empty($data['step'])?'Регистрация не завершена!':'Благодарим за регистрацию!' ?></p>
	
 	<div class="labels">
		<div>имя:</div>
		<div>фамилия:</div>
		<div>телефон:</div>		
	</div>
 	<div class="condition">
		<div><?= !empty($data['fname'])?$data['fname']:'&mdash;'; ?></div>
		<div><?= !empty($data['lname'])?$data['lname']:'&mdash;'; ?></div>
		<div><?= !empty($data['phone'])?$data['phone']:'&mdash;'; ?></div>
	</div>
		
	<br />	
	
 	<div class="labels">
		<div>улица:</div>
		<div>дом:</div>
		<div>город:</div>		
	</div>
 	<div class="condition">
		<div><?= !empty($data['str'])?$data['str']:'&mdash;'; ?></div>
		<div><?= !empty($data['build'])?$data['build']:'&mdash;'; ?></div>
		<div><?= !empty($data['city'])?$data['city']:'&mdash;'; ?></div>
	</div>

	<br />
	
 	<div class="labels">
		<div>feedbackDataId:</div>	
	</div>
 	<div class="condition">
		<div><?= !empty($data['pkey'])?$data['pkey']:'&mdash;'; ?></div>
	</div>		
 
 </div>

