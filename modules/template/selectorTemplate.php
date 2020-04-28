<?php

namespace Selector;
use EvolutionCMS\Ddafilters\Models\FilterParamValues;

include_once(MODX_BASE_PATH . 'assets/tvs/selector/lib/controller.class.php');

class __ALIAS_BIG_FIRST__Controller
{
    public function __construct()
    {
        $query = FilterParamValues::select('id', 'value as pagetitle', 'value as text', 'value as html');
        if(isset($_REQUEST['search'])){
            $query->where('value', 'like', '%'.$_REQUEST['search'].'%');
        }
        echo $query->where('param_id', __TV__ID__)->get()->toJson();

    }
}