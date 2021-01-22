import { FormApi, SubmissionErrors, ValidationErrors } from 'final-form';
import { FC, ReactNode } from 'react';
import { CommonComponentProps } from '../common-component';
export declare type FormSubmit = (values: Record<string, any>, form: FormApi) => SubmissionErrors | Promise<SubmissionErrors | undefined> | undefined | void;
export declare type FormValidate = (values: Record<string, any>) => ValidationErrors | Promise<ValidationErrors> | undefined;
export declare type FormRender = (props: {
    form: FormApi;
    submitting: boolean;
    dirty: boolean;
    values: Record<string, any>;
}) => ReactNode;
export interface FormProps extends CommonComponentProps {
    submit: FormSubmit;
    validate?: FormValidate;
    render: FormRender;
    autoClean?: boolean;
    initialValues?: Record<string, any>;
}
export declare const Form: FC<FormProps>;
export declare const validators: {
    required: (value: any) => "Required" | undefined;
    number: (value: any) => "Must be a number" | undefined;
};
//# sourceMappingURL=form.d.ts.map