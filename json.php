<?php

$util = new Util();

//header('Content-Type: application/json; charset=UTF-8');
$json = $util->GetJson();
$jsonFile = fopen("data.json", "w");
fwrite($jsonFile, $json);
fclose($jsonFile);
die($json);

class Util {
   private $root = "menu";
   private $pathdir;
    //echo $pathdir;
    private $catalog = [];//目录[{id:"",name:""]
    private $content = [];//内容{"i":["","",""]}
    private $catIndex = 0;

    function GetJson():string {
        $this->pathdir = __dir__."/".$this->root;
        try{
            $this->tree($this->pathdir);
            //error_log(json_encode($this->catalog));
            return json_encode(["catalog"=>$this->catalog,"content"=>$this->content]);
        }catch (Throwable $t){
            return json_encode(["err"=>$t->getTraceAsString()]);
        }
    }

    function tree($directory) {
        if(is_dir($directory)) {
            $this->catIndex = $this->catIndex +1;
            //返回一个 Directory 类实例
            $mydir = dir($directory);
            $catName = $this->GetUrlName($directory);
            $catName = iconv("gbk","utf-8",$catName);
            array_push($this->catalog,['id'=>$this->catIndex,"name"=>$catName]);
            $this->content[strval($this->catIndex)] = [];
            //从目录句柄中读取条目
            while($file = $mydir->read()) {
                if(is_dir("$directory/$file") && $file != "." && $file != "..") {
                    //echo "<li><font color=\"#ff00cc\"><b>$file</b></font></li>\n";
                    //递归读取目录
                    $this->tree("$directory/$file");
                } else if ($file != "." && $file != "..") {
                    //echo "文件:".$file;
                    $fileName = $this->GetUrlName($file);
                    $fileName = iconv("gbk","utf-8",$fileName);
                    array_push($this->content[strval($this->catIndex)],$fileName);
                }
            }
           
            //echo "打印结束";
            // 释放目录句柄
            $mydir->close();
        } else {
            $catContent = $this->content[strval($this->catIndex)];
            $fileName = $this->GetUrlName($directory);
            $fileName = iconv("gbk","utf-8",$fileName);
            //echo "文件:".$directory;
            array_push($catContent,$fileName);
        }
    }

    function GetUrlName(string $path){
        $path = str_replace(__dir__,"",$path);
        $path = str_replace('\\','/',$path);
        return $path;
    }
}
