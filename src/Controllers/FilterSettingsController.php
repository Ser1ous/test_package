<?php

namespace EvolutionCMS\Ddafilters\Controllers;


use EvolutionCMS\Ddafilters\Models\FilterCategory;
use EvolutionCMS\Ddafilters\Models\FilterParamsCategory;
use EvolutionCMS\Ddafilters\Models\FilterParamValues;
use EvolutionCMS\Models\SystemSetting;

class FilterSettingsController
{
    public static function getSettings()
    {
        $answer = ['tvs_category' => SystemSetting::find('tvs_category')->setting_value,
            'template_category' => SystemSetting::find('template_category')->setting_value,
            'template_products' => SystemSetting::find('template_products')->setting_value];
        HelperController::response($answer);
    }

    public static function setSettings($request)
    {
        if (isset($request['tvs_category'])) {
            SystemSetting::updateOrCreate(['setting_name' => 'tvs_category'],
                ['setting_value' => $request['tvs_category']]);
        }
        if (isset($request['template_category'])) {
            SystemSetting::updateOrCreate(['setting_name' => 'template_category'],
                ['setting_value' => $request['template_category']]);
        }
        if (isset($request['template_products'])) {
            SystemSetting::updateOrCreate(['setting_name' => 'template_products'],
                ['setting_value' => $request['template_products']]);
        }
        self::getSettings();
    }

}

