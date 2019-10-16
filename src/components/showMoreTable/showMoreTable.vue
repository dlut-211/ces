<template>
    <div>
        <Row>
            <Col v-for="(value,key) in data" :span="value.col" :key="key">
            <div class="showMoreCol">
                <Row>
                    <Col span="8">
                    <div class="name">
                        {{value.name}}:
                    </div>
                    </Col>
                    <Col span="16">
                    <div class="value">
                        {{value.value?value.value:'暂无'}}
                    </div>
                    </Col>
                </Row>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: ["data"]
    };
</script>
<style lang="scss" scoped>
    @import "./showMoreTable.scss";
</style>