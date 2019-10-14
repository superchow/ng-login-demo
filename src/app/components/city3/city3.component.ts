import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  ExistingProvider,
  forwardRef,
  ValueProvider
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { cityData3 } from './city3';
import { UnitGroup } from './city3.def';
import { NzSizeDSType } from 'ng-zorro-antd';

/**
 * 省市区各级别正则校验
 */
const CITY_REGEXPS = [
  /^\d{2}0{4}$/,
  /^\d{2}(([1-9]\d)|(\d[1-9]))0{2}$/,
  /^\d{2}(([1-9]\d)|(\d[1-9]))(([1-9]\d)|(\d[1-9]))$/,
];

/**
 * template-driven forms 模板驱动表单
 * 实现 ngModel
 */
const EXE_CITY3_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => City3Component),
  multi: true,
};
/**
 * 直接提供给provider使用的校验器
 * EXE_CITY3_VALIDATOR
 * @param control AbstractControl
 */
const validateSelectValue: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  if (control.touched) {
    const reg = CITY_REGEXPS[2];
    if (control.value) {
      return reg.test(control.value) ? null : { invalid: true };
    } else {
      return null;
    }
  }
};
/**
 * provider 默认校验使用的方式
 */
const EXE_CITY3_VALIDATOR: ValueProvider = {
  provide: NG_VALIDATORS,
  useValue: validateSelectValue,
  multi: true,
};
/**
 * 自定义校验所使用的校验方式，组件要额外实现 Validator
 */
const EXE_CITY3_VALIDATOR_2: ExistingProvider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => City3Component),
  multi: true,
};

@Component({
  selector: 'app-city3',
  templateUrl: './city3.component.html',
  styleUrls: ['./city3.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EXE_CITY3_VALUE_ACCESSOR, EXE_CITY3_VALIDATOR_2]
})
export class City3Component implements OnInit, ControlValueAccessor, Validator {
  /**
   * 内部存值
   */
  private modelValue: string;
  /**
   * 省市区数据
   */
  private allCityData: Array<UnitGroup> = cityData3;
  /**
   * 当前省的值
   */
  private province$: string;
  /**
   * 获取省级的列表
   */
  public get provinces(): Array<UnitGroup> {
    return this.allCityData;
  }
  /**
   * 当前市的值
   */
  private city$: string;
  /**
   * 获取当前省份的市级列表
   */
  public get cities(): Array<UnitGroup>  {
    const {provinces, province$} = this;
    if (CITY_REGEXPS[0].test(province$)) {
      const current = provinces.find(item => province$ === item.value);
      return (current && current.children) ? current.children : [];
    }
    return [];
  }
  /**
   * 当前县的值
   */
  private county$: string;
  /**
   * 获取当前市的县级列表
   */
  public get counties(): Array<UnitGroup> {
    const {city$, cities} = this;
    if (CITY_REGEXPS[1].test(city$)) {
      const current = cities.find(item => city$ === item.value);
      return (current && current.children) ? current.children : [];
    }
    return [];
  }
  @Input()
  set value(value: string) {
    this.setValue(value, false);
  }
  get value(): string {
    return this.modelValue;
  }
  /**
   * 尺寸，继承于 nz-select
   */
  @Input() nzSize: NzSizeDSType = 'default';
  /**
   * 是否允许清除所选，继承于 nz-select
   * 类型：boolean
   */
  @Input() nzAllowClear: boolean = false;
  /**
   * 是否可以查询，继承于 nz-select
   * 类型：boolean
   */
  @Input() nzShowSearch: boolean = false;
  /**
   * 是否`disable`，继承于 nz-select
   * 类型：boolean
   */
  @Input() nzDisabled: boolean = false;

  // 通知数据源变化
  private onChange: (val: string) => void = () => null;
  private onTouched: () => void = () => null;

  constructor() {
    window[`City3Component`] = this;
  }

  ngOnInit() {
  }

  /**
   * 将数据从模型传播到视图
   * @param val 数字或者字符串
   */
  writeValue(val: string | number): void {
    this.setValue(val, false);
  }
  /**
   * 将数据从视图传播到模型
   * @param fn function
   */
  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }
  /**
   * 将`touch`状态从视图传播到模型
   * @param fn function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /**
   * 设置可选状态
   * @param isDisabled 是否不可选
   */
  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  /**
   * 实现自定义校验，写在组件类可介入入参
   * @param control AbstractControl
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.touched) {
      const reg = CITY_REGEXPS[2];
      if (control.value) {
        return reg.test(control.value) ? null : { invalid: true };
      } else {
        return null;
      }
    }
  }
  /**
   * 为响应式表单提供`touch`状态
   */
  private focus() {
    this.onTouched();
  }

  /**
   * 省份改变
   * @param value nz-select 的 ngModelChange 传出值
   */
  provinceChange(value: string): void {
    const { city$, cities } = this;
    if (!cities.some(c => city$ === c.value)) {
      this.setValue(value, true);
    }
  }
  /**
   * 市改变
   * @param value nz-select 的 ngModelChange 传出值
   */
  cityChange(value: string): void {
    const { county$, counties } = this;
    if (!counties.some(c => county$ === c.value)) {
      this.setValue(value, true);
    }
  }
  /**
   * 县改变
   * @param value nz-select 的 ngModelChange 传出值
   */
  countyChange(value: string): void {
    this.setValue(value, `${this.modelValue}` !== `${value}`);
  }

  /**
   * 组件内部同一写值
   * @param val string
   * @param emit boolean 触发变更通知
   */
  private setValue(val: string | number, emit: boolean): void {
    const value = this.valueCheck(val);
    const [regP, regC, regT] = CITY_REGEXPS;
    if (regT.test(value)) {
      this.province$ = value.substr(0, 2) + '0000';
      this.city$ = value.substr(0, 4) + '00';
      this.county$ = value;
    } else if (regC.test(value)) {
      this.province$ = value.substr(0, 2) + '0000';
      this.city$ = value;
      this.county$ = null;
    } else if (regP.test(value)) {
      this.province$ = value;
      this.city$ = null;
      this.county$ = null;
    } else {
      this.province$ = null;
      this.city$ = null;
      this.county$ = null;
    }
    if (emit && `${this.modelValue}` !== `${value}`) {
      this.onChange(value);
    }
    this.modelValue = value;
  }
  /**
   * 对value值进行格式校验，通过返回数据
   * @param val 输入值
   */
  private valueCheck(val: string | number): string {
    const value = '' + val;
    const valid = CITY_REGEXPS.some(reg => reg.test(value));
    return valid ? value : '';
  }
}
