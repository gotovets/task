<?php

/* @var $this yii\web\View */
use yii\helpers\Html;

$this->title = 'Регистрация';

$data=$model->GetData();
	
$js = ' switch('.$data['step'].') {
		 case 1: formApp.flags.currentStep="person"; break;
		 case 2: formApp.flags.currentStep="adress"; break;
		 case 3: formApp.flags.currentStep="comment"; break;
					  			  } ';

$this->registerCssFile("css/form.css");	
$this->registerJsFile("js/formApp.js", ['position' => \yii\web\View::POS_HEAD]);
$this->registerJs($js, $position=yii\web\View::POS_HEAD);
$this->registerJs('formApp.construct();', $position=yii\web\View::POS_END);
?>


<div id="header">Регистрация</div>
	
	<div id="form">
		
		<div id="person" class="step" <?= $data['step']==1?"data-show='true'":""; ?> >
				<div class="title">Ваши данные</div>
				<div class="fieldLine">
					<div class="fieldTitle">имя</div>
					<input type="text" name="fname" value="<?= isset($data['fname'])?$data['fname']:''; ?>" />
				</div>
				<div class="fieldLine">
					<div class="fieldTitle">фамилия</div>
					<input type="text" name="lname" value="<?= isset($data['lname'])?$data['lname']:''; ?>" />
				</div>
				<div class="fieldLine">
					<div class="fieldTitle">телефон</div>
					<input type="text" name="phone"  placeholder="(XXX)XXX-XX-XX"  value="<?= isset($data['phone'])?$data['phone']:''; ?>" />
				</div>			
				<div class="buttonLine">
					<button>далее >></button>				
				</div>
			
		</div>
		
		
		<div id="adress" class="step" <?= $data['step']==2?"data-show='true'":""; ?> >
				<div class="title">Ваш адрес</div>
				<div class="fieldLine">
					<div class="fieldTitle">улица</div>
					<input type="text" name="str"  value="<?= isset($data['str'])?$data['str']:''; ?>" />
				</div>			
				<div class="fieldLine">
					<div class="fieldTitle">номер дома</div>
					<input type="text" name="build"  value="<?= isset($data['build'])?$data['build']:''; ?>" />
				</div>			
				<div class="fieldLine">
					<div class="fieldTitle">город</div>
					<input type="text" name="city"  value="<?= isset($data['city'])?$data['city']:''; ?>" />
				</div>
				<div class="buttonLine">
					<button class="back"><< назад</button>				
					<button>далее >></button>				
				</div>					
			
		</div>
		
		
		<div id="comment" class="step" <?= $data['step']==3?"data-show='true'":""; ?> >
				<div class="title">Можете добавить комментарий</div>
				<div class="fieldLine">
					<div class="fieldTitle">комментарий</div>
					<textarea id="commentText" name="comment"><?= isset($data['comment'])?$data['comment']:''; ?></textarea>
				</div>			
				<div class="buttonLine">
					<button class="back"><< назад</button>				
					<button id="confirm">готово</button>		
				</div>				
			
		</div>
	
	</div>

