<template>

    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-lg-11 ">
                <section class="section-margin">
                    <!--<div class="row">
                        <div class="col-xs">
                            <div class="float-left">
                                <ui-icon-button button-type="button" type="primary" color="primary"
                                                icon="arrow_back"
                                                tooltip="დაბრუნება" @click="$router.back();">

                                </ui-icon-button>

                            </div>
                        </div>
                    </div>-->
                    <div class="row">
                        <div class="col-xs-2 col-sm-1 end-xs">
                            <h4>{{subCategory}} </h4>
                        </div>
                        <div class="col-xs">
                            <h4>{{subCategoryName}} </h4>
                        </div>

                    </div>
                    <!--new-->
                    <div class="row">
                        <div class="col-xs  margin-top">
                            <ui-button icon="add" class="cursor-pointer" button-type="button" @click="addNew">
                                ახალი ინფორმაციის დამატება
                            </ui-button>
                        </div>
                    </div>

                    <div class="padding-top" v-if="addingNew">
                        <form @submit.prevent="">
                            <div class="row ">
                                <div class="col-xs-2 col-sm-1 end-xs">
                                    <ui-icon-button class="cursor-pointer" type="secondary" button-type="button"
                                                    @click="saveRecord(-1)"
                                                    icon="save"></ui-icon-button>
                                    <br>
                                    <ui-icon-button class="cursor-pointer" type="secondary" button-type="button"
                                                    @click="undoEditing"
                                                    icon="undo"></ui-icon-button>
                                </div>
                                <div class="col-xs-6">
                                    <ui-textbox
                                            ref="publishDate"
                                            v-model="publishDate"
                                            label="გამოქვეყნების თარიღი"
                                            :name="'publishDate'"
                                            data-vv-as="გამოქვეყნების თარიღი"
                                            data-vv-validate-on="change"
                                            v-validate="{required: true, date_format:'YYYY-MM-DD'} "
                                            :invalid="errors.has('publishDate')"
                                            :error="errors.first('publishDate')"
                                            autofocus
                                            autocomplete="off">
                                    </ui-textbox>


                                </div>
                                <div class="col-xs-10 col-sm-11 col-xs-offset-2 col-sm-offset-1">
                                    <ui-textbox
                                            ref="linkTitle"
                                            multi-line
                                            :rows="1"
                                            v-model="linkTitle"
                                            label="სათაური"
                                            :name="'linkTitle'"
                                            data-vv-as="სათაური"
                                            data-vv-validate-on="change"
                                            v-validate="{required: true}"
                                            :invalid="errors.has('linkTitle')"
                                            :error="errors.first('linkTitle')"

                                            autocomplete="off">
                                    </ui-textbox>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-xs col-xs-offset-1">
                                    <ui-fileupload color="primary" name="f1le2" @change="fileAttached">
                                        ასატვირთი დოკუმენტი
                                    </ui-fileupload>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--end new-->
                    <div v-for="item in items" :key="item.Id"
                         class="margin-top bordered-all">
                        <div v-if="editingId!==item.Id" class="padding-top">
                            <div class="row middle-xs">
                                <div class="col-xs-2 col-sm-1 end-xs">
                                    <ui-icon-button button-type="button" @click="editRecord(item.Id)" type="secondary"
                                                    class="cursor-pointer"
                                                    icon="edit">
                                    </ui-icon-button>
                                    <br>
                                    <ui-icon-button button-type="button" @click="showConfirm('deleteConfirm', item.Id )"
                                                    type="secondary"
                                                    class="cursor-pointer"
                                                    icon="delete">
                                    </ui-icon-button>

                                    <ui-confirm
                                            ref="deleteConfirm"
                                            title="დადასტურება"
                                            confirm-button-text="წაშლა"
                                            deny-button-text="არა"
                                            @confirm="deleteRecord"
                                            @deny="onDeny">
                                        ნამდვილად გსურთ ჩანაწერის წაშლა?
                                    </ui-confirm>


                                </div>

                                <div class="col-xs padding-all">
                                    <div>{{item.PublishDate}}</div>
                                    <!--<a :href="$globalState.baseUrl+item.Url" target="_blank">
                                        {{item.Name}}
                                    </a>-->

                                    <a :href="$globalState.baseUrl +item.Url" target="_blank">
                                        {{item.Name}}
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div v-else class="padding-top">
                            <form @submit.prevent="">
                                <div class="row ">
                                    <div class="col-xs-2 col-sm-1 end-xs">
                                        <ui-icon-button class="cursor-pointer" type="secondary" button-type="button"
                                                        @click="saveRecord(item.Id)"
                                                        icon="save"></ui-icon-button>
                                        <br>
                                        <ui-icon-button class="cursor-pointer" type="secondary" button-type="button"
                                                        @click="undoEditing"
                                                        icon="undo"></ui-icon-button>
                                    </div>
                                    <div class="col-xs-6">
                                        <ui-textbox
                                                ref="publishDate"
                                                v-model="publishDate"
                                                label="გამოქვეყნების თარიღი"
                                                :name="'publishDate'" this.linkTitle
                                                data-vv-as="გამოქვეყნების თარიღი"
                                                v-validate="{required: true, date_format:'YYYY-MM-DD'} "
                                                :invalid="errors.has('publishDate')"
                                                :error="errors.first('publishDate')"
                                                autofocus
                                                autocomplete="off">
                                        </ui-textbox>


                                    </div>
                                    <div class="col-xs-10 col-sm-11 col-xs-offset-2 col-sm-offset-1">
                                        <ui-textbox
                                                ref="linkTitle"
                                                multi-line
                                                :rows="1"
                                                v-model="linkTitle"
                                                label="სათაური"
                                                :name="'linkTitle'"
                                                data-vv-as="სათაური"

                                                v-validate="{required: true}"
                                                :invalid="errors.has('linkTitle')"
                                                :error="errors.first('linkTitle')"

                                                autocomplete="off">
                                        </ui-textbox>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-xs col-xs-offset-1">
                                        <ui-fileupload color="primary" name="f1le2" @change="fileAttached">
                                            ასატვირთი დოკუმენტი
                                        </ui-fileupload>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>


                </section>
            </div>
        </div>
        <modal-message ref="errors-modal" :error-messages="errorMessages"
                       info="გადაამოწმეთ შეტანილი ინფორმაცია"></modal-message>


    </div>

</template>

<script>
    import errorMixin from './mixinErrors'
    import modalMessage from './modalMessage'

    export default {
        name: "categoryItems",

        props: ['subCategoryId'],
        components: {
            modalMessage,
        },
        mixins: [errorMixin],
        data: function () {
            return {
                subCategory: "",
                subCategoryName: "",
                items: [],
                editingId: 0,
                deletingId: 0,
                addingNew: 0,
                publishDate: "",
                linkTitle: "",
                uploadedFile: ""
            }
        },

        created() {
            let id = this.subCategoryId;
            let subCat = this.$globalState.subCategories.find(sc => sc.Id.toString() === id);
            this.subCategory = subCat.SubCategory;
            this.subCategoryName = subCat.Name;
            this.items = this.$globalState.items.filter(item => item.SubCategoryId.toString() === id)
                .map(i => {
                    let item = {...i};
                    if (item.PublishDate)
                        item.PublishDate = item.PublishDate.substr(0, 10);
                    return item;
                })
                .sort((a, b) => {
                    if (a.PublishDate >= b.PublishDate)
                        return -1;
                    else
                        return 1;

                })
        },
        methods: {
            showConfirm(ref, id) {
                this.deletingId = id;
                (this.$refs[ref][0]).open();
            },
            editRecord(id) {
                this.addingNew = 0;

                if (this.$refs.publishDate && this.$refs.publishDate.lengt > 0) {
                    this.$refs.publishDate[0].reset();
                    if (valid) {
                        let item = this.items.find(i => i.Id === id);

                        this.$refs.publishDate[0].invalid = false;
                    }
                }

                this.$nextTick(() => {
                    this.editingId = id;
                    let item = this.items.find(i => i.Id === id);
                    this.publishDate = item.PublishDate;
                    this.linkTitle = item.Name;

                })


            },
            async saveRecord(id) {
                try {
                    let valid = await this.$validator.validateAll();
                    if (valid) {
                        //let item = this.items.find(i => i.Id === id);
                        if (id === -1) {
                            let formData = new FormData();
                            formData.append("SubCategoryId", this.subCategoryId);
                            formData.append("Name", this.linkTitle);
                            formData.append("PublishDate", this.publishDate);
                            formData.append("AttachmentFile", this.uploadedFile);

                            let postRes = await this.$axios.post(this.$globalState.apiUrl + '/PostItems', formData,
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                });
                            if (this.ServerErrors(postRes)) {
                                this.showErrors()
                            } else {
                                let item = {
                                    Id: postRes.data.Id,
                                    SubCategoryId: this.subCategoryId,
                                    PublishDate: this.publishDate,
                                    Name: this.linkTitle,
                                    Url: postRes.data.Url
                                };
                                this.$globalState.items.push(item);
                                this.items.push(item);
                                this.items.sort((a, b) => {
                                    if (a.PublishDate >= b.PublishDate)
                                        return -1;
                                    else
                                        return 1;

                                })
                            }
                        }
                        this.editingId = 0;
                        this.addingNew = 0;
                    }
                } catch (e) {

                }
            },
            undoEditing() {
                this.editingId = 0;
                this.addingNew = 0;

            },
            addNew() {
                /* if (this.$refs.publishDate && this.$refs.publishDate.lengt>0) {
                     this.$refs.publishDate[0].reset();
                     this.$refs.publishDate[0].invalid = false;
                 }*/
                this.publishDate = "";
                this.linkTitle = "";

                this.addingNew = 1;
                this.editingId = 0;
            },
            async deleteRecord() {
                let Id = this.deletingId;
                let itemIndex = -1;
                try {
                    let response = await this.$postData('/DeleteItems', {Id});
                    if (response.status === 200) {
                        itemIndex = this.items.findIndex(i => i.Id === Id);
                        this.items.splice(itemIndex, 1);
                        itemIndex = this.$globalState.items.findIndex(i => i.Id === Id);
                        this.$globalState.items.splice(itemIndex, 1);
                    }
                } catch (err) {
                    this.showErrors(err);
                }
            },
            fileAttached(files) {
                this.uploadedFile = files[0];
            },

            onDeny() {
                this.deletingId = 0;
            }

        }

    }
</script>

<style scoped>

</style>