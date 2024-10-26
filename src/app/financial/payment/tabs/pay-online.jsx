
import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import {Description, Fieldset, Label, Legend} from "@/components/fieldset";
import {Text} from "@/components/text";
import {Checkbox, CheckboxField, CheckboxGroup} from "@/components/checkbox";
import {Divider} from "@/components/divider";
import {BankOptions} from "@/app/financial/payment/tabs/bank-info/bank-options";

export default function PayOnline() {
    return (
        <div>
            <Fieldset>
                <Legend>Enable Online Payment</Legend>
                <Text>可以选择不同的支付渠道，若未进行银行相关信息填写，系统将提示您进入第三方审核页面</Text>
                <CheckboxGroup>
                    <CheckboxField>
                        <Checkbox name="discoverability" value="show_on_events_page" defaultChecked/>
                        <Label>Finix</Label>
                        <Description> </Description>
                    </CheckboxField>
                    <CheckboxField>
                        <Checkbox name="discoverability" value="allow_embedding"/>
                        <Label>Stripe</Label>
                        <Description> </Description>
                    </CheckboxField>
                    <CheckboxField>
                        {/*<Checkbox name="discoverability" value="allow_embedding" />*/}
                        <Label> </Label>
                        <Description> </Description>
                    </CheckboxField>
                </CheckboxGroup>

            </Fieldset>

            <Divider className="mb-12" soft/>

            <div className="flex space-x-6">
                <BankOptions factory={"Stripe"}/>
                <BankOptions factory={"Finix"}/>
            </div>

            {/*<div className="flex justify-end gap-4">*/}
            {/*    <Button type="submit">Save changes</Button>*/}
            {/*</div>*/}
        </div>
    );
}